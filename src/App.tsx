import { FunctionComponent, useState, useEffect, useRef } from 'react';

import Button from './components/Button';
import Filter from './components/Filter';
import IssueBlock from './components/IssueBlock';
import IssueForm from './components/IssueForm';
import FilterIcon from './images/filter.svg?react';
import { DataService } from './services/data';
import { Issue } from './types/common';

import './styles/page.scss';

const App: FunctionComponent = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  const dataService = new DataService();

  const footerRef = useRef<HTMLDivElement>(null);

  // fetching the issues on load
  useEffect(() => {
    dataService.fetchComments().then((data: Issue[]) => {
      setIssues(data);
      setFilteredIssues(data);
      setTags([...new Set(data.flatMap((issue: Issue) => issue.tags))]);
    });
  }, []);

  // this is useful to scroll to form when the page is really long
  const scrollToBottom = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilter = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredIssues(issues); // Show all issues if no tags are selected
    } else {
      setFilteredIssues(issues.filter((issue) => selectedTags.every((tag) => issue.tags.includes(tag))));
    }
  };

  const handleDelete = (id: string) => {
    dataService.deleteComment(id).then(() => {
      const cleanIssues = issues.filter((issue) => issue.id !== id);
      setIssues(cleanIssues);
      updateTags(cleanIssues);
    });
  };

  const handleAdd = (newIssue: Issue) => {
    dataService.saveComment(newIssue).then(() => {
      setIssues([...issues, newIssue]);
      updateTags([...issues, newIssue]);
    });
  };

  const handleEdit = (updatedIssue: Issue) => {
    const updatedIssues = issues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue));
    setIssues(updatedIssues);
    updateTags(updatedIssues);
  };

  const updateTags = (issues: Issue[]): void => {
    const updatedTags = [...new Set(issues.flatMap((issue) => issue.tags))];
    setTags(updatedTags);
  };

  return (
    <div className="issue-tracker">
      <header className="issue-header">
        <h1 className="heading">Issue Tracker</h1>
        <button onClick={() => setShowFilter((prev) => !prev)} className={`icon-btn ${showFilter ? 'active' : ''}`}>
          <FilterIcon />
        </button>
        <Button className="positive" label="New Issue" large onClick={scrollToBottom} />
      </header>
      {showFilter && (
        <>
          <Filter availableTags={tags} onFilter={handleFilter} />
          <hr className="divider" />
        </>
      )}
      <div className="issue-list">
        {filteredIssues.map((issue) => (
          <IssueBlock
            key={issue.id}
            issue={issue}
            onEdit={handleEdit}
            onDelete={handleDelete}
            availableTags={tags}
            setTags={setTags}
          />
        ))}
      </div>

      <hr className="divider" />

      <IssueForm onSave={handleAdd} availableTags={tags} />

      <hr className="divider" />

      <div className="footer" ref={footerRef}>
        Cool Issue Tracker &copy; 2024
      </div>
    </div>
  );
};

export default App;

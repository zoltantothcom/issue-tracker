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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  const dataService = new DataService();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dataService.fetchIssues().then((data: Issue[]) => {
      setIssues(data);
      setTags([...new Set(data.flatMap((issue) => issue.tags))]);
    });
  }, []);

  // scroll to form when the page is too long
  const scrollToBottom = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilter = (selectedTags: string[]) => {
    setSelectedTags(selectedTags);
  };

  const handleFilterDisplay = () => {
    if (showFilter) {
      setSelectedTags([]);
    }
    setShowFilter((prev) => !prev);
  };

  const handleDelete = (id: string) => {
    dataService.deleteIssue(id).then(() => {
      const updatedIssues = issues.filter((issue) => issue.id !== id);
      setIssues(updatedIssues);
      updateTags(updatedIssues);
    });
  };

  const handleAdd = (newIssue: Issue) => {
    dataService.saveIssue(newIssue).then(() => {
      const updatedIssues = [...issues, newIssue];
      setIssues(updatedIssues);
      updateTags(updatedIssues);
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

  const filteredIssues = selectedTags.length
    ? issues.filter((issue) => selectedTags.every((tag) => issue.tags.includes(tag)))
    : issues;

  return (
    <div className="issue-tracker">
      <header className="issue-header">
        <h1 className="heading">Issue Tracker</h1>
        <button onClick={handleFilterDisplay} className={`icon-btn ${showFilter ? 'active' : ''}`}>
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

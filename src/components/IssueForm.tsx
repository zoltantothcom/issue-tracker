import { FunctionComponent, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import { Issue } from '../types/common';

import '../styles/components/tag.scss';

interface IssueFormProps {
  onSave: (issue: Issue) => void;
  onCancel?: () => void;
  availableTags: string[];
  initialIssue?: Issue;
}

const IssueForm: FunctionComponent<IssueFormProps> = ({ onSave, onCancel, availableTags, initialIssue }) => {
  const [currentIssue, setCurrentIssue] = useState<Issue>(
    initialIssue || { id: uuidv4(), title: '', text: '', tags: [] }
  );
  const [tagInput, setTagInput] = useState<string>('');

  useEffect(() => {
    if (initialIssue) {
      setCurrentIssue(initialIssue);
    }
  }, [initialIssue]);

  const handleSave = () => {
    onSave(currentIssue);
    if (!initialIssue) {
      setCurrentIssue({ id: uuidv4(), title: '', text: '', tags: [] });
    }
    setTagInput('');
  };

  const handleTagAdd = () => {
    if (tagInput && !currentIssue.tags.includes(tagInput)) {
      setCurrentIssue({ ...currentIssue, tags: [...currentIssue.tags, tagInput] });
    }
    setTagInput('');
  };

  const handleTagRemove = (tag: string) => {
    const updatedTags = currentIssue.tags.filter((t) => t !== tag);
    setCurrentIssue({ ...currentIssue, tags: updatedTags });
  };

  return (
    <div className="issue-card">
      <input
        type="text"
        className="input"
        placeholder="Title"
        value={currentIssue.title}
        onChange={(e) => setCurrentIssue({ ...currentIssue, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="input"
        rows={6}
        value={currentIssue.text}
        onChange={(e) => setCurrentIssue({ ...currentIssue, text: e.target.value })}
      />
      <div className="tags-section">
        <div className="tags-input">
          <input
            type="text"
            className="input inline"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleTagAdd()}
          />
          <Button onClick={handleTagAdd} className="neutral" label="Add Tag" />
        </div>

        {availableTags.length !== currentIssue.tags.length && (
          <div className="tags-container">
            {availableTags
              .filter((tag) => !currentIssue.tags.includes(tag))
              .map((tag) => (
                <span
                  key={tag}
                  className="tag inactive"
                  onClick={() => setCurrentIssue({ ...currentIssue, tags: [...currentIssue.tags, tag] })}
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>

      {currentIssue.tags.length > 0 && (
        <div className="tags-container">
          {currentIssue.tags.map((tag) => (
            <span key={tag} className="tag" onClick={() => handleTagRemove(tag)}>
              {tag} &times;
            </span>
          ))}
        </div>
      )}
      <div className="issue-actions">
        <Button onClick={handleSave} label={initialIssue ? 'Save Changes' : 'Add Issue'} className="positive" />
        {onCancel && <Button onClick={onCancel} label="Cancel" className="neutral" />}
      </div>
    </div>
  );
};

export default IssueForm;

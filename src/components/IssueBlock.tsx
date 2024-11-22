import { FunctionComponent, useState } from 'react';

import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import IssueForm from './IssueForm';
import Tag from './Tag';
import useCalculation from '../hooks/useCalculation';
import { Issue } from '../types/common';

import '../styles/components/issue-block.scss';
import '../styles/components/tag.scss';

interface IssueProps {
  issue: Issue;
  onEdit: (updatedIssue: Issue) => void;
  onDelete: (id: string) => void;
  setTags: (tags: string[]) => void;
  availableTags: string[];
}

const IssueBlock: FunctionComponent<IssueProps> = ({ issue, onEdit, onDelete, availableTags = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const calculate = useCalculation();

  const handleConfirmDelete = () => {
    onDelete(issue.id);
    setShowDeleteModal(false);
  };

  return (
    <div>
      {isEditing ? (
        <IssueForm
          initialIssue={issue}
          availableTags={availableTags}
          onSave={(updatedIssue) => {
            onEdit(updatedIssue);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      ) : (
        <div className="issue-card">
          <h2 className="issue-title heading">{issue.title}</h2>
          <p className="issue-text" dangerouslySetInnerHTML={{ __html: calculate(issue.text) }} />
          <div className="tags-container">
            {issue.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="issue-actions">
            <Button className="neutral" onClick={() => setIsEditing(true)} label="Edit" />
            <Button className="negative" onClick={() => setShowDeleteModal(true)} label="Delete" />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this item?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default IssueBlock;

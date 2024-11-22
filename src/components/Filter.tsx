import { FunctionComponent, useState } from 'react';

import '../styles/components/filter.scss';

interface FilterProps {
  availableTags: string[];
  onFilter: (selectedTags: string[]) => void;
}

const Filter: FunctionComponent<FilterProps> = ({ availableTags, onFilter }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCheckboxChange = (tag: string) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    onFilter(updatedTags);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter by tags</h2>
      <div className="filter-list">
        {availableTags.map((tag) => (
          <label key={tag} className="filter-checkbox">
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;

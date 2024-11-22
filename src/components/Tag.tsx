import { FunctionComponent, ReactNode } from 'react';

import '../styles/components/tag.scss';

interface TagProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  large?: boolean;
}

const Tag: FunctionComponent<TagProps> = ({ onClick, children, className, large = false }) => {
  return (
    <span onClick={onClick} className={`tag ${large ? 'large' : ''} ${className || ''}`}>
      {children}
    </span>
  );
};

export default Tag;

import { FunctionComponent } from 'react';

import '../styles/components/button.scss';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  large?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, label, className, large = false }) => {
  return (
    <button onClick={onClick} className={`btn ${large ? 'large' : ''} ${className || ''}`}>
      {label}
    </button>
  );
};

export default Button;

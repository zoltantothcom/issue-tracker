import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../src/components/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button label="Click Me" />);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    render(<Button label="Test Button" className="test-class" />);

    const button = screen.getByText('Test Button');

    expect(button).toHaveClass('test-class');
  });

  it('calls onClick when clicked', async () => {
    const onClickMock = vi.fn();

    render(<Button label="Click Me" onClick={onClickMock} />);

    const button = screen.getByText('Click Me');

    await userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

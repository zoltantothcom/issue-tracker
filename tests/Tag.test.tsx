import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tag from '../src/components/Tag';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Tag>lorem</Tag>);

    expect(screen.getByText('lorem')).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    render(<Tag large>lorem</Tag>);

    const tag = screen.getByText('lorem');

    expect(tag).toHaveClass('large');
  });

  it('calls onClick when clicked', async () => {
    const onClickMock = vi.fn();

    render(<Tag onClick={onClickMock}>lorem</Tag>);

    const tag = screen.getByText('lorem');

    await userEvent.click(tag);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from '@testing-library/react';
import TabButton from '../components/elements/buttons/TabButton';

describe('TabButton', () => {
  it('renders learn react link', () => {
    render(<TabButton>hello</TabButton>);
    const button = screen.getByText(/hello/i);
    expect(button).toBeInTheDocument();
    // screen.debug();
  });
});

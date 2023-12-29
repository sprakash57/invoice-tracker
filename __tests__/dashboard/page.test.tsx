import Page from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Dashboard', () => {
  it('renders a heading', () => {
    render(<Page />);
    const heading = screen.getByText(/Welcome to Acme/);
    expect(heading).toBeInTheDocument();
  });
});

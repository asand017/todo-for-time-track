import { render, screen } from '@testing-library/react';
import App from './App';

test('renders time tracker header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Time Tracker/i);
  expect(linkElement).toBeInTheDocument();
});

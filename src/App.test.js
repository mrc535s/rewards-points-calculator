import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header element', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', /reward points calculator/i);
  expect(headerElement).toBeInTheDocument();
});

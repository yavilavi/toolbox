import React from 'react';
import { render, screen } from '@testing-library/react';
import Create from './create';

test('renders learn react link', () => {
  render(<Create />);
  const linkElement = screen.findByRole('application');
  expect(linkElement).toBeInTheDocument();
});

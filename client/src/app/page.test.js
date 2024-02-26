import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Plan Your Next Daily Trip In A Few Steps/i)).toBeInTheDocument();
  });
});

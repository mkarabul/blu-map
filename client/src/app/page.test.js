import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Plan Your Next Daily Trip In A Few Steps/i)).toBeInTheDocument();
  });

  it('displays the Choose Destination section', () => {
    render(<Home />);
    expect(screen.getByText(/Choose Destination/i)).toBeInTheDocument();
  });

  it('displays the Choose Activities section', () => {
    render(<Home />);
    expect(screen.getByText(/Choose Activities/i)).toBeInTheDocument();
  });

  it('displays the Get a Complete Trip section', () => {
    render(<Home />);
    expect(screen.getByText(/Get a Complete Trip/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

const MockNavbar = ({ theme, toggleTheme }) => (
  <Router>
    <Navbar theme={theme} toggleTheme={toggleTheme} />
  </Router>
);

describe('Navbar', () => {
  // Test for displaying the text "Admin Dashboard"
  test('displays the text "Admin Dashboard"', () => {
    render(<MockNavbar theme="light" toggleTheme={() => {}} />);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  // Test for link to the homepage
  test('contains a link to the homepage', () => {
    render(<MockNavbar theme="light" toggleTheme={() => {}} />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  // Test for link to the search page
  test('contains a link to the search page', () => {
    render(<MockNavbar theme="light" toggleTheme={() => {}} />);
    const searchLink = screen.getByRole('link', { name: /search/i });
    expect(searchLink).toBeInTheDocument();
    expect(searchLink).toHaveAttribute('href', '/search');
  });

  // Test for theme toggle button visibility
  test('displays the theme toggle button', () => {
    render(<MockNavbar theme="light" toggleTheme={() => {}} />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });


describe('Navbar', () => {
    test('toggles theme icon when theme changes', async () => {
      const toggleTheme = jest.fn();
      render(<MockNavbar theme="dark" toggleTheme={toggleTheme} />);
      
      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i });
      await userEvent.click(toggleButton);
      
      expect(toggleTheme).toHaveBeenCalled();
    });
  });
});

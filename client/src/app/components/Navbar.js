import React from 'react';

function Navbar() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: 'white' }}>
      <div>BluMap</div>
      <nav>
        <ul style={{ listStyleType: 'none', display: 'flex', gap: '1rem' }}>
          <li>Search</li>
          <li>Trips</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

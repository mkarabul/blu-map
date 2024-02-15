import React from 'react';

function Footer() {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: 'white' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <span>Popular Locations</span>
        <span>Popular Activities</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <span>Contact Us</span>
        <span>FAQs</span>
        <span>Terms of Service</span>
      </div>
    </footer>
  );
}

export default Footer;

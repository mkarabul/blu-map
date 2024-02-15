import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1', padding: '2rem' }}>
        <h1>Plan Your Next Daily Trip In A Few Steps</h1>
        <div>
          <section>
            <h2>Choose Destination</h2>
            <p>Choose the date and the destination you want to make a trip to.</p>
          </section>
          <section>
            <h2>Choose Activities</h2>
            <p>Choose activities you want to do or places you want to visit and when.</p>
          </section>
          <section>
            <h2>Get a Complete Trip</h2>
            <p>Get a complete trip timeline as well as options and recommendations to optimize or design the trip.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;

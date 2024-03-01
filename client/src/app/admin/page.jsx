import React from 'react';
import SearchPage from './components/SearchPage';
import ChartsPage from './components/Charts';

const HomePage = () => {

  return (
    <div>
      <ChartsPage />
      <SearchPage />
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import IFilters from './types/IFilters';
import Filters from './Filters';
import Reco from './Reco';
import './App.css';

const App: React.SFC = () => {
  const [filters, setFilters] = useState<IFilters>({
    compTerit: '',
    specialite: '',
    domaine: ''
  });

  const handleFilterChange = (name: keyof IFilters, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="App">
      <Filters onFilterChange={handleFilterChange} />
      <Reco filters={filters} />
    </div>
  );
};

export default App;

// src/App.js

import React, { useState } from 'react';
import './App.css';
import OrganizationUnitNav from './OrganizationUnitNav';

function App() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Håndterer valg av en organisasjonsenhet og oppdaterer breadcrumbs
  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    updateBreadcrumbs(unit);
  };

  // Oppdaterer breadcrumbs basert på valgt enhet
  const updateBreadcrumbs = (unit) => {
    const breadcrumbTrail = [];
    let currentUnit = unit;
    while (currentUnit) {
      breadcrumbTrail.unshift(currentUnit);
      currentUnit = currentUnit.parentUnit;
    }
    setBreadcrumbs(breadcrumbTrail);
  };

  // Renderer breadcrumbs
  const renderBreadcrumbs = () => {
    return (
      <div className="breadcrumbs">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.unit_id}>
            {index > 0 && ' / '}
            <button onClick={() => handleSelectUnit(crumb)} className="breadcrumb-link">
              {crumb.name}
            </button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header>
        <div className="header-left">
          <img src="https://www.hvl.no/Static/internett/images/logo-no.svg" alt="HVL Logo" />
        </div>
        <div className="header-middle">
          <h1>Organization Units Navigation</h1>
        </div>
        <div className="header-right">
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main>
        <div className="sidebar">
          <OrganizationUnitNav onSelectUnit={handleSelectUnit} />
        </div>
        <div className="content">
          {renderBreadcrumbs()}
          {selectedUnit && <h1>{selectedUnit.name}</h1>}
        </div>
      </main>
      <footer>
        &copy; {new Date().getFullYear()} HVL
      </footer>
    </div>
  );
}

export default App;

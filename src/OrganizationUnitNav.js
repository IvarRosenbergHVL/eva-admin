// src/OrganizationUnitNav.js

import React, { useState, useEffect } from 'react';
import { generateToken, fetchOrganizationUnits } from './api';

const OrganizationUnitNav = ({ onSelectUnit }) => {
  const [orgUnits, setOrgUnits] = useState([]);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [error, setError] = useState(null);

  // Henter organisasjonsenheter når komponenten lastes inn
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await generateToken();
        const data = await fetchOrganizationUnits(token);
        setOrgUnits(data);
      } catch (error) {
        setError('Failed to fetch organization units.');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Utvider eller kollapser en enhet og oppdaterer breadcrumbs
  const toggleExpand = (unitId) => {
    setExpandedUnits((prevExpandedUnits) => ({
      ...prevExpandedUnits,
      [unitId]: !prevExpandedUnits[unitId],
    }));
  };

  // Renderer organisasjonsenheter rekursivt
  const renderOrgUnits = (units, parentUnit = null) => {
    return (
      <ul>
        {units.map((unit) => (
          <li key={unit.unit_id}>
            <div
              className="org-unit"
              onClick={() => {
                unit.parentUnit = parentUnit; // Set the parent unit
                toggleExpand(unit.unit_id);
                onSelectUnit(unit);
              }}
            >
              {unit.name} {unit.children && unit.children.length > 0 && (expandedUnits[unit.unit_id] ? '[-]' : '[+]')}
            </div>
            {expandedUnits[unit.unit_id] && (
              <div style={{ marginLeft: 20 }}>
                {unit.children && unit.children.length > 0 && renderOrgUnits(unit.children, unit)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Organization Units</h2>
      {renderOrgUnits(orgUnits)}
    </div>
  );
};

export default OrganizationUnitNav;

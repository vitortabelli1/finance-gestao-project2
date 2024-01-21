// NovoHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const NovoHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/outro">Outro Componente</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NovoHeader;

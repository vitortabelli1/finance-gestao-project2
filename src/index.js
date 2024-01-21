import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ManagementApp from './pages/App'; // Atualize o caminho de importação

ReactDOM.render(
  <React.StrictMode>
    <ManagementApp />
  </React.StrictMode>,
  document.getElementById('root')
);
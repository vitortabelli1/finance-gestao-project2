// ManagementApp.js
import React from 'react';
import ManagementPage from './ManagementPage';
import Dashboard from './Dashboard';
import Header from './Header';
import HeaderCustomizado from './HeaderCustomizado';




function ManagementApp() {
  return (
    <div className="App">
      <ManagementPage />
      <Dashboard />
      <Header />
      <HeaderCustomizado/>
      
      
      
    </div>
  );
}

export default ManagementApp;

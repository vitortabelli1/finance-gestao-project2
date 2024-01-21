import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const HeaderCustomizado = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <header className="header-customizado">
      <div className="logo">Gestão-Optimize</div>
      <div className="icons-container">
        <FontAwesomeIcon icon={faBell} className="icon" />
        <div className="icon" onClick={togglePopup}>
          <FontAwesomeIcon icon={faUser} />
          {showPopup && (
            <div className="popup">
              <a href="#">Perfil</a>
              <a href="#">Conta</a>
              <a href="#">Sair</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderCustomizado;

// NovoHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

const NovoHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/painel">Painel</Link></li>
          <li><Link to="/desempenho">Desempenho</Link></li>
          <li><Link to="/atividades">Atividades</Link></li>
          <li><Link to="/poupanca">Poupança</Link></li>
        </ul>
      </nav>
      {/* Adicione links de navegação ou outros elementos conforme necessário */}
    </header>
  );
}

export default NovoHeader;

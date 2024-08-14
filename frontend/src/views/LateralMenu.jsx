import React from 'react';
import './LateralMenu.css';
import { Link } from 'react-router-dom';

const LateralMenu = ({ items, onSelect, onConfigClick, isGuest }) => {
  return (
    <div className="lateral-menu">
      {items.map((item, index) => (
        item !== "Configuración" || !isGuest ? ( // Oculta la opción de Configuración si es un invitado
          <button key={index} onClick={() => onSelect(item)} className="menu-button">
            {item}
          </button>
        ) : null
      ))}
      <div>
        <Link to="/app/settings" className="menu-button">Settings</Link>
      </div>
    </div>
  );
};

export default LateralMenu;

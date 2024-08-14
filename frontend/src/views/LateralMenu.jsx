import React from 'react';
import './LateralMenu.css';
import { Link } from 'react-router-dom';

const LateralMenu = ({ items, onSelect, onConfigClick }) => {
  return (
    <div className="lateral-menu">
      {items.map((item, index) => (
        <button key={index} onClick={() => onSelect(item)} className="menu-button">
          {item}
        </button>
      ))}
      {/* <div>
        <Link to="/app/settings" className="menu-button" onClick={onConfigClick}>
          Configuracion
        </Link>
      </div> */}
    </div>
  );
};

export default LateralMenu;
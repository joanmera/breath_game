import React from 'react';
import './LateralMenu.css';
import { Link } from 'react-router-dom';

const LateralMenu = ({ items, onSelect }) => {
  return (
    <div className="lateral-menu">
      {items.map((item, index) => (
        <button key={index} onClick={() => onSelect(item)} className="menu-button">
          {item}
        </button>
      ))}
      <div>
        <Link to="/app/settings" className="menu-button">Settings</Link>
      </div>
    </div>
  );
};

export default LateralMenu;
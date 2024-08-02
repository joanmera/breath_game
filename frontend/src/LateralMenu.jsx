import React from 'react';
import './LateralMenu.css';

const LateralMenu = ({ items, onSelect }) => {
  return (
    <div className="lateral-menu">
      {items.map((item, index) => (
        <button key={index} onClick={() => onSelect(item)} className="menu-button">
          {item}
        </button>
      ))}
    </div>
  );
};

export default LateralMenu;
import React, { useState } from 'react';
import './App.css';
import LateralMenu from './LateralMenu';
import GrowingBall from './GrowingBall';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Ataque de Panico');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const menuItems = ['Estres','Ataque de Panico','Ansiedad','Meditacion'];

  return (
    <div className="app">
      <LateralMenu items={menuItems} onSelect={handleSelect} />
      <div className="content">
        <h1>{selectedItem}</h1>
        <div className="ball"></div> 
      </div>
      <div className="info">
        <h1>Info adicional</h1>
      </div>
    </div>
  );
};

export default App;

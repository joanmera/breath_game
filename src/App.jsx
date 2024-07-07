import React, { useState, useEffect } from 'react';
import './App.css';
import './GrowingBall.css';
import LateralMenu from './LateralMenu';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Ataque de Panico');
  const [isGrowing, setIsGrowing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [ballClass, setBallClass] = useState('ball');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleButtonClick = () => {
    setIsGrowing(!isGrowing);
    if (!isGrowing) {
      setTimer(0); // Reinicia el contador cuando se empieza de nuevo
      setBallClass('ball grow');
    } else {
      setBallClass('ball');
    }
  };

  const menuItems = ['Estres', 'Ataque de Panico', 'Ansiedad', 'Meditacion', 'Concentracion', 'Mejor sueño'];

  // Efecto para actualizar el contador cada segundo cuando isGrowing es true
  useEffect(() => {
    let intervalId;
    if (isGrowing) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isGrowing]);

  return (
    <div className="app">
      <LateralMenu items={menuItems} onSelect={handleSelect} />
      <div className="content">
        <h1>{selectedItem}</h1>
        <div className={ballClass}>
          <div className="inner-ball">
            {isGrowing && <span className="timer">{timer} seg</span>}
          </div>
        </div>
        <button className="grow-button" onClick={handleButtonClick}>
          {isGrowing ? 'Detener' : 'Empezar'}
        </button>
      </div>
      <div className="info">
        <h1>¿Cómo lo uso?</h1>
        <p>Para empezar, haz clic en 'Empezar'. Comenzará un contador que te ayudará a medir tus tiempos y progreso en el ejercicio. Debes inspirar hasta que la bola alcance su tamaño máximo y luego sostener la respiración mientras la bola comienza a encogerse. Cuando esto suceda, debes exhalar y repetir el ciclo.</p>
        <ul>
          <li>Estres: 60 segundos</li>
          <li>Ataque de Panico: 300 segundos</li>
          <li>Ansiedad: 120 segundos</li>
          <li>Meditacion: 300 segundos</li>
          <li>Concentracion: 60-120 segundos</li>
          <li>Mejor sueño: 180 segundos</li>
        </ul>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import './GrowingBall.css';
import LateralMenu from './LateralMenu';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Ataque de Pánico');
  const [isGrowing, setIsGrowing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [ballClass, setBallClass] = useState('ball');
  const [recomendaciones, setRecomendaciones] = useState('');
  const [tiempo_estimado, setTexto] = useState('');

  const handleSelect = (item) => {
    setSelectedItem(item);

    if (item === 'Estrés') {
      setRecomendaciones('Reducir el estrés puede ayudar a prevenir problemas de salud mental como la depresión y la ansiedad.');
      setTexto('Tiempo: 60 segundos');
    } else if (item === 'Ataque de Pánico') {
      setRecomendaciones('Practicar técnicas de respiración profunda puede ayudar a calmarte durante un ataque de pánico. Respira lenta y profundamente, enfocándote en inhalar y exhalar de manera controlada.');
      setTexto('   Tiempo: 300 segundos');
    } else if (item === 'Ansiedad') {
      setRecomendaciones('El ejercicio físico regular puede reducir los niveles de ansiedad al liberar endorfinas y mejorar tu estado de ánimo. Encuentra actividades físicas que disfrutes y hazlas parte de tu rutina diaria.');
      setTexto('   Tiempo: 120 segundos');
    } else if (item === 'Meditación') {
      setRecomendaciones('La meditación es conocida por su capacidad para reducir los niveles de cortisol, la hormona del estrés, en el cuerpo. Beneficios de practicar la meditación.');
      setTexto('   Tiempo: 300 segundos');
    } else if (item === 'Concentración') {
      setRecomendaciones('La concentración es muy útil para mejorar la productividad y la eficiencia en tus tareas diarias. Practicar técnicas de concentración puede ayudarte a mantener el enfoque.');
      setTexto('   Tiempo:  60 - 120 segundos');
    } else if (item === 'Mejor sueño') {
      setRecomendaciones('Dormir bien es esencial para la salud física y mental. Establecer una rutina de sueño regular y crear un ambiente relajante puede mejorar la calidad del sueño.');
      setTexto('   Tiempo: 180 segundos');
    } else {
      setRecomendaciones('');
      setTexto('');
    }
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

  const menuItems = ['Estrés', 'Ataque de Pánico', 'Ansiedad', 'Meditación', 'Concentración', 'Mejor sueño'];

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
        <h2>Recomendaciones</h2>
        <p>{recomendaciones}</p>
        <h2>Empecemos:</h2>
        <p> Haz clic en 'Empezar' para iniciar el contador. Inspira hasta que la bola alcance su tamaño máximo, luego sostén la respiración mientras la bola se encoge. Exhala y repite el ciclo.</p>
        <p>{tiempo_estimado}</p>
      </div>
    </div>
  );
};

export default App;

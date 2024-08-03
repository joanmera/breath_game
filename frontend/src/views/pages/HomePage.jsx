import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Home = () => {
  return(
  <div className="frame">
    <div className="title">
      <h1>BIENVENIDO</h1>
    </div>
    <div className="gpt">
      <h2>[frase gpt]</h2>
    </div>
    <div className="buttons">
      <Link to="/login" className="button-link">login</Link>
      <Link to="/app" className="button-link">guest</Link>
    </div>
  </div>
  );
};

export default Home;
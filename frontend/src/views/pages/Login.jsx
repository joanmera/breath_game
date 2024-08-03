import React, { useState, useEffect } from 'react';
import './Login.css'; 
import { Link, Outlet } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [isRegisterVisible, setIsRegisterVisible] = useState(true);
  const [isCancelVisible, setIsCancelVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar credenciales aquí (esto es solo un ejemplo)
    if (email === 'test@example.com' && password === 'password') {
      // Manejar la autenticación exitosa (ej., redirigir al usuario)
      alert('Inicio de sesión exitoso');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleRegisterClick = () => {
    setShowSubmitButton(false);
    setIsRegisterVisible(false);
    setIsCancelVisible(true)
    setShowRegisterButton(true)
  };

  const handleCancelClick = () => {
    setShowSubmitButton(true);
    setIsRegisterVisible(true);
    setIsCancelVisible(false)
    setShowRegisterButton(false)
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <Outlet />
        {showSubmitButton && <button type="submit">Iniciar sesión</button>}
      </form>
      {isRegisterVisible && (
        <div>
          <Link to="/login/register" className="button-link" onClick={handleRegisterClick}>Registrarse</Link>
        </div>
      )}
      {isCancelVisible && (
        <div>
          <Link to="/login" className="button-link" onClick={handleCancelClick} >Cancelar</Link>
        </div>
      )}
      {showRegisterButton && <button type="submit">Crear cuenta</button>}
    </div>
  );
};

export default LoginPage;
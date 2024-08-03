import React, { useState } from 'react';
import './Login.css'; 
import { Link, Outlet } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);

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
      <Link to="/login/register" className="button-link" onClick={handleRegisterClick}>Registrarse</Link>
    </div>
  );
};

export default LoginPage;

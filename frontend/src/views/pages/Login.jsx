import React, { useState } from 'react';
import './Login.css';
import { Link, Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [correo, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [isRegisterVisible, setIsRegisterVisible] = useState(true);
  const [isCancelVisible, setIsCancelVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', { // URL de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();

        if (response.ok) {
          // Redirige a la página /app
          navigate('/app');
        } else {
          setError(result.error || 'Error desconocido');
        }
      } else {
        const text = await response.text(); // Obtiene el texto en caso de error
        setError(`Error inesperado: ${text}`);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Error de conexión');
    }
  };

  const handleRegisterClick = () => {
    setShowSubmitButton(false);
    setIsRegisterVisible(false);
    setIsCancelVisible(true);
  };

  const handleCancelClick = () => {
    setShowSubmitButton(true);
    setIsRegisterVisible(true); 
    setIsCancelVisible(false);
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
                value={correo}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={contrasena}
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
    </div>
  );
};

export default LoginPage;
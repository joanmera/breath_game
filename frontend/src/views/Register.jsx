import React, { useState, useEffect } from 'react';
import ListaPaises from '../controllers/ListaPaises';

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    pais: '',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pais');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error al obtener los países:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSelect = (selectedOption) => {
    setFormData(prevData => ({
      ...prevData,
      pais: selectedOption
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos a la base de datos
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="extend">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Nombre Completo:</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userName">Usuario:</label>
          <input
            type="text"
            id="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pais">País:</label>
          <ListaPaises 
            options={countries.map(country => country.nombre)} 
            onSelect={handleSelect} 
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;

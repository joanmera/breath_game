import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ListaPaises from '../controllers/Paises.jsx';

const baseURL = "http://localhost:3001/paises";

const Register = () => {

    const options = ['ecu', 'peru']

    const handleSelect = (selectedOption) => {
        console.log('Selected option:', selectedOption);
    }

    return(
        <div className="extend">
            <div>
              <label htmlFor="fullName">Nombre Completo:</label>
              <input
                type="name"
                id="fullName"
              />
            </div>
            <div>
              <label htmlFor="userName">Usuario:</label>
              <input
                type="UserName"
                id="UserName"
              />
            </div>
            <div>
                <label htmlFor="pais">Pais:</label>
                <ListaPaises options={options} onSelect={handleSelect} />
            </div>
        </div>
        
        
    );
};

export default Register;
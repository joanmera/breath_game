import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import "./views/GrowingBall.css";
import LateralMenu from "./views/LateralMenu";

const App = () => {
  const [selectedItem, setSelectedItem] = useState("Ataque de Pánico");
  const [isGrowing, setIsGrowing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [ballClass, setBallClass] = useState("ball");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [tiempo_estimado, setTexto] = useState("");
  const [ShowHideBall, setHideBall] = useState(true);
  const [showRegistroTable, setShowRegistroTable] = useState(false);
  const [showUsuariosTable, setShowUsuariosTable] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [userId, setUserId] = useState(2); // Aquí debes obtener el ID del usuario logueado

  const handleSelect = (item) => {
    setSelectedItem(item);

    if (item === "Configuración") {
      setHideBall(false);
      setShowRegistroTable(false);
      setShowUsuariosTable(false);
    } else {
      setHideBall(true);
    }

    if (item === "Estrés") {
      setRecomendaciones(
        "Reducir el estrés puede ayudar a prevenir problemas de salud mental como la depresión y la ansiedad."
      );
      setTexto("Tiempo: 60 segundos");
    } else if (item === "Ataque de Pánico") {
      setRecomendaciones(
        "Practicar técnicas de respiración profunda puede ayudar a calmarte durante un ataque de pánico. Respira lenta y profundamente, enfocándote en inhalar y exhalar de manera controlada."
      );
      setTexto("Tiempo: 300 segundos");
    } else if (item === "Ansiedad") {
      setRecomendaciones(
        "El ejercicio físico regular puede reducir los niveles de ansiedad al liberar endorfinas y mejorar tu estado de ánimo. Encuentra actividades físicas que disfrutes y hazlas parte de tu rutina diaria."
      );
      setTexto("Tiempo: 120 segundos");
    } else if (item === "Meditación") {
      setRecomendaciones(
        "La meditación es conocida por su capacidad para reducir los niveles de cortisol, la hormona del estrés, en el cuerpo. Beneficios de practicar la meditación."
      );
      setTexto("Tiempo: 300 segundos");
    } else if (item === "Concentración") {
      setRecomendaciones(
        "La concentración es muy útil para mejorar la productividad y la eficiencia en tus tareas diarias. Practicar técnicas de concentración puede ayudarte a mantener el enfoque."
      );
      setTexto("Tiempo: 60-120 segundos");
    } else if (item === "Mejor sueño") {
      setRecomendaciones(
        "Dormir bien es esencial para la salud física y mental. Establecer una rutina de sueño regular y crear un ambiente relajante puede mejorar la calidad del sueño."
      );
      setTexto("Tiempo: 180 segundos");
    } else {
      setRecomendaciones("");
      setTexto("");
    }
  };

  const saveRegistro = async ({ tiempo, inhalaciones, exhalaciones, ciclos, id_usuario }) => {
    const response = await fetch("http://localhost:3000/api/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tiempo,
        inhalaciones,
        exhalaciones,
        fecha: new Date().toISOString().split("T")[0], // Fecha actual
        ciclos,
        id_usuario,
      }),
    });

    if (!response.ok) {
      console.error("Error al guardar el registro:", response.statusText);
    } else {
      const data = await response.json();
      console.log("Registro guardado exitosamente:", data);
    }
  };

  const handleButtonClick = () => {
    setIsGrowing(!isGrowing);
    if (!isGrowing) {
      setTimer(0); // Reinicia el contador cuando se empieza de nuevo
      setBallClass("ball grow");
      setCiclos(0);
    } else {
      setBallClass("ball");

      // El juego ha terminado, guarda los resultados finales
      const finalInhalacion = parseInt(localStorage.getItem('inhalacion'));
      const finalExhalacion = parseInt(localStorage.getItem('exhalacion'));
      const finalCiclos = parseFloat(localStorage.getItem('ciclos'));

      console.log(`Resultados finales:`);
      console.log(`Inhalación final: ${finalInhalacion} segundos`);
      console.log(`Exhalación final: ${finalExhalacion} segundos`);
      console.log(`Ciclos completados: ${finalCiclos}`);

      // Guardar el registro en la base de datos
      saveRegistro({
        tiempo: timer, // Tiempo total
        inhalaciones: finalInhalacion,
        exhalaciones: finalExhalacion,
        ciclos: finalCiclos,
        id_usuario: userId, // ID del usuario logueado
      });
    }
  };

  const handleRegistroClick = () => {
    setShowRegistroTable(true);
    setShowUsuariosTable(false);
    fetchRegistros(); // Llamar a la función para obtener los registros cuando se selecciona "Registro"
  };

  const handleUsuariosClick = () => {
    setShowRegistroTable(false);
    setShowUsuariosTable(true);
    fetchUsuarios(); // Llamar a la función para obtener los usuarios cuando se selecciona "Usuarios"
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuario"); // Cambia la URL si es necesario
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/registro"); // Cambia la URL si es necesario
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error("Error fetching registros:", error);
    }
  };

  const menuItems = [
    "Estrés",
    "Ataque de Pánico",
    "Ansiedad",
    "Meditación",
    "Concentración",
    "Mejor sueño",
    "Configuración"
  ];

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

  // Efecto para manejar el ciclo de crecimiento y contracción de la bola
  useEffect(() => {
    if (isGrowing) {
      const ballElement = document.querySelector('.ball');
      const handleAnimationIteration = (event) => {
        if (event.animationName === 'growShrink') {
          if (ballClass.includes('grow')) {
            // La bola ha alcanzado su punto máximo - Inhalación
            console.log(`Inhalación: ${timer} segundos`);
            const inhalacion = timer;
            console.log(`Exhalación: ${timer + 1} segundos`);
            const exhalacion = timer + 1;
            const ciclos = inhalacion / 10;
            console.log(`Ciclos: ${ciclos}`);

            // Guardar en localStorage
            localStorage.setItem('inhalacion', inhalacion);
            localStorage.setItem('exhalacion', exhalacion);
            localStorage.setItem('ciclos', ciclos);
          }
        }
      };

      ballElement.addEventListener('animationiteration', handleAnimationIteration);

      return () => {
        ballElement.removeEventListener('animationiteration', handleAnimationIteration);
      };
    }
  }, [isGrowing, timer, ballClass]);

  // Leer valores de localStorage al cargar el componente
  useEffect(() => {
    const savedInhalacion = localStorage.getItem('inhalacion');
    const savedExhalacion = localStorage.getItem('exhalacion');
    const savedCiclos = localStorage.getItem('ciclos');

    if (savedInhalacion) {
      console.log(`Inhalación guardada: ${savedInhalacion} segundos`);
    }
    if (savedExhalacion) {
      console.log(`Exhalación guardada: ${savedExhalacion} segundos`);
    }
    if (savedCiclos) {
      console.log(`Ciclos guardados: ${savedCiclos}`);
    }
  }, []);

  return (
    <div className="app">
      <LateralMenu items={menuItems} onSelect={handleSelect} onConfigClick={() => setHideBall(false)} />
      <div className="content">
        <h1>{selectedItem}</h1>
        {ShowHideBall ? (
          <div className={ballClass} onClick={handleButtonClick}>
            <div className="inner-ball">
              {isGrowing && <span className="timer">{timer} seg</span>}
            </div>
            {!isGrowing && (
              <i className="fas fa-hand-pointer icon-click"></i> /* Icono de clic */
            )}
          </div>
        ) : (
          <div>
            <button className="config-button" onClick={handleRegistroClick}>Registro</button>
            <button className="config-button" onClick={handleUsuariosClick}>Usuarios</button>

            {showRegistroTable && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tiempo</th>
                    <th>Inhalaciones</th>
                    <th>Exhalaciones</th>
                    <th>Fecha</th>
                    <th>Ciclos</th>
                    <th>Id Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro) => (
                    <tr key={registro.id}>
                      <td>{registro.tiempo}</td>
                      <td>{registro.inhalaciones}</td>
                      <td>{registro.exhalaciones}</td>
                      <td>{registro.fecha}</td>
                      <td>{registro.ciclos}</td>
                      <td>{registro.id_usuario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {showUsuariosTable && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID Usuario</th>
                    <th>Nombre Usuario</th>
                    <th>Contraseña</th>
                    <th>Correo</th>
                    <th>Activo</th>
                    <th>Perfil Administrador</th>
                    <th>País ID</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id_usuario}>
                      <td>{usuario.id_usuario}</td>
                      <td>{usuario.nombre_usuario}</td>
                      <td>{usuario.contrasena}</td>
                      <td>{usuario.correo}</td>
                      <td>{usuario.activo ? "Sí" : "No"}</td>
                      <td>{usuario.perfil_administrador ? "Sí" : "No"}</td>
                      <td>{usuario.pais_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <Outlet />
      <div className="info">
        <h1>¿Cómo lo uso?</h1>
        <p>
          Para empezar, haz clic en la bola. Comenzará un contador que te
          ayudará a medir tus tiempos y progreso en el ejercicio. Debes inhalar
          hasta que la bola alcance su tamaño máximo y luego sostener la
          respiración mientras la bola comienza a encogerse. Cuando esto suceda,
          debes exhalar y repetir el ciclo.
        </p>
        <ul>
          <li>Estrés: 60 segundos</li>
          <li>Ataque de Pánico: 300 segundos</li>
          <li>Ansiedad: 120 segundos</li>
          <li>Meditación: 300 segundos</li>
          <li>Concentración: 60-120 segundos</li>
          <li>Mejor sueño: 180 segundos</li>
        </ul>
      </div>
    </div>
  );
};

export default App;

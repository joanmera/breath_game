// routes/index.js

const express = require('express');
const router = express.Router();
const { getPaises, createPais, updatePais, deletePais } = require('../models/pais');
const { getUsuarios, createUsuario,getNextUserId, updateUsuario, deleteUsuario } = require('../models/usuario');
const { getRegistros, createRegistro, updateRegistro, deleteRegistro } = require('../models/registro');

// Rutas para pais
router.get('/pais', async (req, res) => {
  try {
    const paises = await getPaises();
    res.json(paises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/pais', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pais');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para usuario
router.get('/usuario', async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.post('/usuario', async (req, res) => {
  try {
    const nuevoUsuario = await createUsuario(req.body);
    res.json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizadoUsuario = await updateUsuario(id, req.body);
    res.json(actualizadoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUsuario(id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para registro
router.get('/registro', async (req, res) => {
  try {
    const registros = await getRegistros();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/registro', async (req, res) => {
  try {
    const nuevoRegistro = await createRegistro(req.body);
    res.json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/registro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizadoRegistro = await updateRegistro(id, req.body);
    res.json(actualizadoRegistro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/registro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRegistro(id);
    res.json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para login
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuarios = await getUsuarios(); // Verifica qué datos devuelve esta función
    console.log('Usuarios:', usuarios); // Agrega esta línea para depurar

    const usuario = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuario) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { nombre_usuario, contrasena, nombre_completo, correo, pais_id } = req.body;

  // Generar un ID de usuario aleatorio
  const id_usuario = await getNextUserId();

  try {
    // Llamar a la función para insertar el nuevo usuario en la base de datos
    const nuevoUsuario = await createUsuario({
      id_usuario,
      nombre_usuario,
      contrasena,
      nombre_completo,
      correo,
      pais_id,
      activo: true, // Valor por defecto
      perfil_administrador: false, // Valor por defecto
      perfil_publico: true // Valor por defecto
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: nuevoUsuario.id_usuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

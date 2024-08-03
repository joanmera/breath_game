const express = require('express');
const { getPaises, createPais, updatePais, deletePais } = require('../models/pais');
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../models/usuario');
const { getRegistros, createRegistro, updateRegistro, deleteRegistro } = require('../models/registro');

const router = express.Router();

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
    const nuevoPais = await createPais(req.body.nombre);
    res.json(nuevoPais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/pais/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizadoPais = await updatePais(id, req.body.nombre);
    res.json(actualizadoPais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/pais/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deletePais(id);
    res.json({ message: 'País eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


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

module.exports = router;

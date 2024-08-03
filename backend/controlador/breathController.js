const express = require('express');
const { getPaises, createPais } = require('../models/pais');
const { getUsuarios, createUsuario } = require('../models/usuario');
const { getRegistros, createRegistro } = require('../models/registro');

const router = express.Router();

// Rutas para pais
router.get('/paises', async (req, res) => {
  const paises = await getPaises();
  res.json(paises);
});

router.post('/paises', async (req, res) => {
  const nuevoPais = await createPais(req.body.nombre);
  res.json(nuevoPais);
});

// Rutas para usuario
router.get('/usuarios', async (req, res) => {
  const usuarios = await getUsuarios();
  res.json(usuarios);
});

router.post('/usuarios', async (req, res) => {
  const nuevoUsuario = await createUsuario(req.body);
  res.json(nuevoUsuario);
});

// Rutas para registro
router.get('/registros', async (req, res) => {
  const registros = await getRegistros();
  res.json(registros);
});

router.post('/registros', async (req, res) => {
  const nuevoRegistro = await createRegistro(req.body);
  res.json(nuevoRegistro);
});

module.exports = router;

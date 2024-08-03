const pool = require('../config/database');

const getUsuarios = async () => {
  const res = await pool.query('SELECT * FROM usuario');
  return res.rows;
};

const createUsuario = async (usuario) => {
  const { nombre_usuario, contrasena, nombre_completo, correo, activo, perfil_administrador, perfil_publico, pais_id } = usuario;
  const res = await pool.query(
    'INSERT INTO usuario (nombre_usuario, contrasena, nombre_completo, correo, activo, perfil_administrador, perfil_publico, pais_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [nombre_usuario, contrasena, nombre_completo, correo, activo, perfil_administrador, perfil_publico, pais_id]
  );
  return res.rows[0];
};

module.exports = { getUsuarios, createUsuario };

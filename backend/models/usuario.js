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

const updateUsuario = async (id, usuario) => {
  const { nombre_usuario, contrasena, nombre_completo, correo, activo, perfil_administrador, perfil_publico, pais_id } = usuario;
  const res = await pool.query(
    'UPDATE usuario SET nombre_usuario = $1, contrasena = $2, nombre_completo = $3, correo = $4, activo = $5, perfil_administrador = $6, perfil_publico = $7, pais_id = $8 WHERE id_usuario = $9 RETURNING *',
    [nombre_usuario, contrasena, nombre_completo, correo, activo, perfil_administrador, perfil_publico, pais_id, id]
  );
  return res.rows[0];
};

const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };

const pool = require('../config/database');

const getPaises = async () => {
  const res = await pool.query('SELECT * FROM pais');
  return res.rows;
};

const createPais = async (nombre) => {
  const res = await pool.query('INSERT INTO pais (nombre) VALUES ($1) RETURNING *', [nombre]);
  return res.rows[0];
};

module.exports = { getPaises, createPais };

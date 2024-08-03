const pool = require('../config/database');

const getRegistros = async () => {
  const res = await pool.query('SELECT * FROM registro');
  return res.rows;
};

const createRegistro = async (registro) => {
  const { tiempo, inhalaciones, exhalaciones, fecha, ciclos, id_usuario } = registro;
  const res = await pool.query(
    'INSERT INTO registro (tiempo, inhalaciones, exhalaciones, fecha, ciclos, id_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [tiempo, inhalaciones, exhalaciones, fecha, ciclos, id_usuario]
  );
  return res.rows[0];
};

module.exports = { getRegistros, createRegistro };

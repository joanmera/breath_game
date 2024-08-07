const pool = require('../config/database');

const getRegistros = async () => {
  const res = await pool.query('SELECT * FROM registro');
  return res.rows;
};


const updateRegistro = async (id, registro) => {
  const { tiempo, inhalaciones, exhalaciones, fecha, ciclos, id_usuario } = registro;
  const res = await pool.query(
    'UPDATE registro SET tiempo = $1, inhalaciones = $2, exhalaciones = $3, fecha = $4, ciclos = $5, id_usuario = $6 WHERE id_registro = $7 RETURNING *',
    [tiempo, inhalaciones, exhalaciones, fecha, ciclos, id_usuario, id]
  );
  return res.rows[0];
};

const deleteRegistro = async (id) => {
  await pool.query('DELETE FROM registro WHERE id_registro = $1', [id]);
};

module.exports = { getRegistros, updateRegistro, deleteRegistro };

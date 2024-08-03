const pool = require('../config/database');


exports.getAllCountries = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM país');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los países' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};


exports.getAllRecords = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registro');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

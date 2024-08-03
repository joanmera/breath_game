const express = require('express');
const bodyParser = require('body-parser');
const breathController = require('./controlador/breathController');

const pool = require('./config/database');

const app = express();
const PORT = 3001;

app.get('/paises', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pais');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.use(bodyParser.json());
app.use('/api', breathController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


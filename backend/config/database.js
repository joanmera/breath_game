const { Pool } = require('pg'); 

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Xtratech2069',
  database: 'breath_game'
});

pool.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión', err.stack));

module.exports = pool;


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

const breathController = require('./controlador/breathController');


app.get('/countries', breathController.getAllCountries);
app.get('/users', breathController.getAllUsers);
app.get('/records', breathController.getAllRecords);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${3000}`);
});

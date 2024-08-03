const express = require('express');
const bodyParser = require('body-parser');
const breathController = require('./controlador/breathController');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/api', breathController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


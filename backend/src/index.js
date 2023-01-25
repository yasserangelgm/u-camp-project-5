const express = require('express');
const consola = require('./helpers/consola');
const app = express();

require('dotenv').config();

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.PORT, () =>
  consola('FgCyan', `Servidor activo en el puerto: ${process.env.PORT}!`)
);

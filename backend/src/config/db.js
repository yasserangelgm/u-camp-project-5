const moongose = require('mongoose');
const consola = require('../helpers/consola');

require('dotenv').config();

moongose.set('strictQuery', false);

const connectDB = async () => {
  await moongose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => consola('FgGreen', '     Base de datos conectada       '))
    .catch((error) => {
      consola('FgRed', error);
      process.exit(1);
    });
};

module.exports = connectDB;

const express = require('express');
const consola = require('./helpers/consola');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

//Route imports
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
/* const logoutRoute = require("./routes/logout.routes"); */
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/cors-options');

//Middlewares
require('dotenv').config();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/', require('./routes/refresh-token.routes'));
app.use('/api/', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

//Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT, () =>
  consola('FgCyan', `Servidor activo en el puerto: ${process.env.PORT}!`)
);

connectDB();

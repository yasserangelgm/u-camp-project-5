const express = require("express");
const consola = require("./helpers/consola");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//Route imports
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

//Middlewares
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

//Routes
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(process.env.PORT, () =>
  consola("FgCyan", `Servidor activo en el puerto: ${process.env.PORT}!`)
);

connectDB();

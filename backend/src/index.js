const express = require("express");
var cors = require("cors");

const apiRouter = require("./routes/api");
const PORT = process.env.PORT || 9000;
require("./db");

// inicializamos la app
const app = express();
// usamos cors para permitir las llamadas desde el front
app.use(cors());

// Middleware

app.use(express.json());

// Rutas

app.use("/api", apiRouter);

// Ejecucion del servidor

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

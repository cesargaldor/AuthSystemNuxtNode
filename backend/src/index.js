const express = require("express");
const auth_routes = require("./routes/auth/auth.js");
const PORT = process.env.PORT || 9000;
require("./db");

// inicializamos la app

const app = express();

// Middleware

app.use(express.json());

// Rutas

app.use("/auth", auth_routes);

// Ejecucion del servidor

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

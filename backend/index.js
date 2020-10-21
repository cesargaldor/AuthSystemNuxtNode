const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());

// Configuración de la base de datos

const connection = mysql.createConnection({
  host: "localhost",
  user: "cgd",
  password: "betis96",
  database: "videos",
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Database connected");
  }
});

// Ejecucion del servidor

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const { Sequelize } = require("sequelize");

// importamos los modelos
const userModel = require("./models/users");

// Creamos la conexión
const connection = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  }
);

// Conectamos cada uno de los modelos con la bd

const User = userModel(connection, Sequelize);

// Sincronizamos la bd

connection
  .sync({
    force: false,
  })
  .then(() => {
    console.log("Database synced succesfully!");
  });

module.exports = {
  User,
};

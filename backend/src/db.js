const { Sequelize } = require("sequelize");

// importamos los modelos
const userModel = require("./models/users");

// Creamos la conexión
const connection = new Sequelize("videos", "cgd", "betis96", {
  host: "localhost",
  dialect: "mysql",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

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

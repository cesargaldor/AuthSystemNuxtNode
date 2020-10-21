const router = require("express").Router();

/* Igual que en el archivo app.js, en este caso cuando accedemos a la ruta base /api/users/register
hacemos que salte el controlador, que no deja de ser otro middleware que se activa al entrar
en dicha ruta. A su vez el controlador, es el encargado de conectarse y realizar las 
diferentes funciones en la base de datos
*/

router.get("/", (req, res) => {
  res.send("hola");
});

//router.get("/:id", getUserById);
//router.post("/register", register);
//router.delete("/:id", removeUserById);
//router.post("/login", login);

module.exports = router;

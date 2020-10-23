const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db");
const { check, validationResult } = require("express-validator");

// Login del usuario

router.get("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.json({
        message: "Login succesful",
      });
    } else {
      res.json({
        message: "Wrong password",
      });
    }
  } catch (error) {
    res.json({
      message: "That username doesn't exists.",
    });
  }
});

// Registrar usuario

router.post(
  "/register",
  /*Esto actua como un middleware en la ruta, checkeando si se producen errores o no */
  [
    check("name", "Name cannot be empty").not().isEmpty(),
    check("username", "Username cannot be empty").not().isEmpty(),
    check("password", "Password cannot be empty").not().isEmpty(),
    check("password", "Password must be 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Traigo todas las variables desde el request
    const { name, lastName, username, password } = req.body;
    // Y encripto la contraseña
    const securePassword = await bcrypt.hash(password, 10);

    /* Aqui se comprueba si hay errores en la validacion anterior*/
    const errors = validationResult(req);

    /* Si hay errores, devuelve un status 422 y los errores en formato json*/
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array(),
      });
    }
    // Si no, crea el usuario
    await User.create({
      name: name,
      lastName: lastName,
      username: username,
      password: securePassword,
    });
    res.json({
      message: "User added succesfully",
    });
  }
);

// Editar usuario

router.put("/edit/:username", async (req, res) => {
  const { name, lastName, username, password } = req.body;
  const securePassword = await bcrypt.hash(password, 10);
  try {
    await User.update(
      {
        name: name,
        lastName: lastName,
        username: username,
        password: securePassword,
      },
      {
        where: { username: req.params.username },
      }
    );
    res.json({
      message: "User edited succesfully",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});

// Eliminar usuario

router.delete("/delete/:username", async (req, res) => {
  try {
    await User.destroy({
      where: { username: req.params.username },
    });
    res.json({
      message: "User removed succesfully",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;

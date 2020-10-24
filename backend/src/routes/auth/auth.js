const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");

// Login del usuario

router.post("/login", async (req, res) => {
  //const { email, password } = req.body;

  /* Se comprueba si hay un email en la base de datos que 
  coincida con el que introduce el usuario*/
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    /* Si existe el email, compara la contraseña que hay en la base de datos
      con la que ha introducido el usuario*/
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        res.json({
          message: "Login succesful",
          token: createToken(user),
        });
      } else {
        res.json({
          message: "Wrong password",
        });
      }
    } else {
      res.json({
        message: "That email doesn't exists.",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Método para crear un token

const createToken = (user) => {
  /* Este método crea un payload al que le mete el id del usuario y una fecha de expiracion
  que será 1 hora después de creacion del token */
  const payload = {
    userId: user.id,
    createdAt: moment().unix(),
    expiredAt: moment().add(60, "minutes").unix(),
  };

  return jwt.encode(payload, "secretkeyword");
};

// Registrar usuario

router.post(
  "/register",
  /*Esto actua como un middleware en la ruta, checkeando si se producen errores o no */
  [
    check("email", "Email must be correct").isEmail(),
    check("email", "Email cannot be empty").not().isEmpty(),
    check("username", "Username cannot be empty").not().isEmpty(),
    check("password", "Password cannot be empty").not().isEmpty(),
    check("password", "Password must be 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Traigo todas las variables desde el request
    const { email, username, password } = req.body;
    // Y encripto la contraseña
    const securePassword = await bcrypt.hash(password, 10);

    /* Aqui se comprueba si hay errores en la validacion anterior*/
    const errors = validationResult(req);

    /* Si hay errores, devuelve un status 422 y los errores en formato json*/
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      });
    }
    // Si no, crea el usuario
    try {
      await User.create({
        email: email,
        username: username,
        password: securePassword,
      });
      res.json({
        message: "User added succesfully",
      });
    } catch (error) {
      res.json({
        message: "Already exists an user with that email or username",
      });
    }
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

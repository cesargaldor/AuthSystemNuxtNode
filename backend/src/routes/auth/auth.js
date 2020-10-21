const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db");

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

router.post("/register", async (req, res) => {
  const { name, lastName, username, password } = req.body;
  const securePassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name: name,
      lastName: lastName,
      username: username,
      password: securePassword,
    });
    res.json({
      message: "User added succesfully",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});

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

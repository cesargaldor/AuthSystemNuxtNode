const router = require("express").Router();
const authRoutes = require("./auth/auth");

router.use("/auth", authRoutes);

module.exports = router;

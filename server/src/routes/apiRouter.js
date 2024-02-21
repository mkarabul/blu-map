const express = require("express");

const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/users", userRoutes);

module.exports = router;

const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/profile-trip", profileTripRoutes);

module.exports = router;

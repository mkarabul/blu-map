const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripsRoutes = require("./profileTripsRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/profile-trips", profileTripsRoutes);

module.exports = router;

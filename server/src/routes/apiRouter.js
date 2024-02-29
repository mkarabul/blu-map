const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");
const itineraryRoutes = require("./itineraryRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/profile-trip", profileTripRoutes);
router.use("/itineraries", itineraryRoutes);

module.exports = router;

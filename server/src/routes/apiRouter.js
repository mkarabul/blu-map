const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");
const itineraryRoutes = require("./itineraryRoutes");
const adminRoutes = require("./adminRoutes");
const socialPostRoutes = require("./socialPostRoutes");
const adminProfile = require("./profileTripAdminRoutes")
const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/profile-trip", profileTripRoutes);
router.use("/itineraries", itineraryRoutes);
router.use("/social-post", socialPostRoutes);
router.use("/admin-profile-trip", adminProfile);


module.exports = router;

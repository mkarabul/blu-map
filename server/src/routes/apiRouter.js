const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");
const itineraryRoutes = require("./itineraryRoutes");
const adminRoutes = require("./adminRoutes");
const adminProfileRoutes= require("./profileTripAdminRoutes");

const socialPostRoutes = require("./socialPostRoutes");
const notificationRoutes = require("./notificationRoutes");
const reportRoutes = require("./reportRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/profile-trip", adminProfileRoutes);
router.use("/profile-trip-admin", adminprofile);

router.use("/itineraries", itineraryRoutes);
router.use("/social-post", socialPostRoutes);
router.use("/notification", notificationRoutes);
router.use("/reports", reportRoutes);


module.exports = router;

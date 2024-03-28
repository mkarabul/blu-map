const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");
const itineraryRoutes = require("./itineraryRoutes");
const adminRoutes = require("./adminRoutes");
const socialPostRoutes = require("./socialPostRoutes");
const notificationRoutes = require("./notificationRoutes");
const recommendationRoutes = require("./recommendationRoutes");
const reportRoutes = require("./reportRoutes");
const followSystemRoutes = require("./followSystemRoutes");
const followRequestRoutes = require("./followRequestRoutes");


const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/profile-trip", profileTripRoutes);
router.use("/itineraries", itineraryRoutes);
router.use("/social-post", socialPostRoutes);
router.use("/notification", notificationRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/reports", reportRoutes);
router.use("/follow", followSystemRoutes);
router.use("/follow-request", followRequestRoutes);

module.exports = router;

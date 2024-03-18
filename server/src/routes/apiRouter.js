const express = require("express");

const userRoutes = require("./userRoutes");
const profileTripRoutes = require("./profileTripRoutes");
const itineraryRoutes = require("./itineraryRoutes");
const adminRoutes = require("./adminRoutes");

const socialPostRoutes = require("./socialPostRoutes");
const notificationRoutes = require("./notificationRoutes");
const reportRoutes = require("./reportRoutes");
const postRoutes = require("./postRouter");
const followSystemRoutes = require("./followSystemRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

router.use("/itineraries", itineraryRoutes);
router.use("/social-post", socialPostRoutes);
router.use("/notification", notificationRoutes);
router.use("/reports", reportRoutes);
router.use("/follow", followSystemRoutes)

module.exports = router;

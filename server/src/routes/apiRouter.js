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
const likeRoutes = require("./likeRoutes");
const dislikeRoutes = require("./dislikeRoutes");
const commentRoutes = require("./commentRoutes");
const blockRoutes = require("./blockRoutes");
const friendRoutes = require("./friendRoutes");
const preferenceRoutes = require("./preferenceRoutes");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/profile-trip", profileTripRoutes);
router.use("/itineraries", itineraryRoutes);
router.use("/social-post", socialPostRoutes);
router.use("/notification", notificationRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/likes", likeRoutes);
router.use("/dislikes", dislikeRoutes);
router.use("/comments", commentRoutes);
router.use("/reports", reportRoutes);
router.use("/follow", followSystemRoutes);
router.use("/follow-request", followRequestRoutes);
router.use("/block", blockRoutes);
router.use("/friend", friendRoutes);
router.use("/preferences", preferenceRoutes);

module.exports = router;

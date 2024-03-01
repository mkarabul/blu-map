const express = require("express");
const ProfileTripController = require("../controllers/NotificationController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;

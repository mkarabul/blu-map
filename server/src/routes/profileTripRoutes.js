const express = require("express");
const ProfileTripController = require("../controllers/ProfileTripController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("", ProfileTripController.createProfileTrip);

router.get(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.getProfileTrips
);

router.get("", ProfileTripController.getPublicProfileTrips);

module.exports = router;

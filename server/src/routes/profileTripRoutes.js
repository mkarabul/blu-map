const express = require("express");
const ProfileTripController = require("../controllers/ProfileTripController");

const router = express.Router();

router.get("", ProfileTripController.getPublicProfileTrips);

router.get("/:userId", ProfileTripController.getProfileTrips);

router.post("", ProfileTripController.createProfileTrip);

module.exports = router;

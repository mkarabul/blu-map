const express = require("express");
const ProfileTripController = require("../controllers/ProfileTripController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.createProfileTrip
);

router.get(
  "/user/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.getProfileTrips
);

router.get("/public/:userName", ProfileTripController.getPublicProfileTrips);

router.get("/:uuid", ProfileTripController.getTripById);
router.patch("/:uuid/toggle-public", ProfileTripController.togglePublicbyUUID);


router.get("", ProfileTripController.getSocialProfileTrips);

module.exports = router;

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

router.get("", ProfileTripController.getSocialProfileTrips);

router.patch("/:uuid/increment-likes", ProfileTripController.incrementLikes);
router.patch(
  "/:uuid/increment-dislikes",
  ProfileTripController.incrementDislikes
);

router.patch("/:uuid/comments", ProfileTripController.addComment);

//router.get("/:uuid/comments", ProfileTripController.getComments);

module.exports = router;

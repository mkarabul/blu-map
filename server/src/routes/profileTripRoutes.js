const express = require("express");
const multer = require("multer");
const ProfileTripController = require("../controllers/ProfileTripController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.createProfileTrip
);

router.delete(
  "/:uuid",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.deleteProfileTrip
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
router.get("/social/", ProfileTripController.getSocialPublicProfileTrips);

router.put(
  "/user/:userId/switch-mode",
  ProfileTripController.updateProfileTripModebyID
);

router.patch("/:uuid/increment-likes", ProfileTripController.incrementLikes);
router.patch(
  "/:uuid/increment-dislikes",
  ProfileTripController.incrementDislikes
);

router.patch(
  "/:tripId/images",
  checkJwt,
  getUserInfoMiddleware,
  upload.array("image", 5),
  ProfileTripController.updateTripImages
);

router.get("/:tripId/images", ProfileTripController.getTripImages);

module.exports = router;

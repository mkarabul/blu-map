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

router.get(
  "/user/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.getProfileTrips
);

router.get("/public/:userName", ProfileTripController.getPublicProfileTrips);

router.get("/:uuid", ProfileTripController.getTripById);

router.get("", ProfileTripController.getSocialProfileTrips);

router.patch(
  "/:tripId/images",
  checkJwt,
  getUserInfoMiddleware,
  upload.array("image", 5),
  ProfileTripController.updateTripImages
);

module.exports = router;

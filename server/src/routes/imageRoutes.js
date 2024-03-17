const express = require("express");
const multer = require("multer");
const ImageController = require("../controllers/ImageController");
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

const express = require("express");
const ProfileTripController = require("../controllers/NotificationController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.createNotification
);

router.get(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.getNotificationByUserId
);

router.get(
  "/get-all/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.getAllNotificationsByUserId
);

router.delete(
  "/:id",
  checkJwt,
  getUserInfoMiddleware,
  ProfileTripController.deleteNotificationById
);

module.exports = router;

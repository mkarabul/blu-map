const express = require("express");
const multer = require("multer");
const ProfilePictureController = require("../controllers/ProfilePictureController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/:userId/upload",
  checkJwt,
  getUserInfoMiddleware,
  upload.single("profilePicture"),
  ProfilePictureController.uploadProfilePicture
);

router.patch(
  "/:userId/update",
  checkJwt,
  getUserInfoMiddleware,
  upload.single("profilePicture"),
  ProfilePictureController.updateProfilePicture
);

router.delete(
  "/:userId/delete",
  checkJwt,
  getUserInfoMiddleware,
  ProfilePictureController.deleteProfilePicture
);

router.get("/:userId/retrieve", ProfilePictureController.getProfilePicture);

module.exports = router;

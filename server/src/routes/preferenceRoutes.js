const express = require("express");
const router = express.Router();
const PreferenceController = require("../controllers/PreferenceController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

router.get(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  PreferenceController.getPreferences
);

module.exports = router;

const express = require("express");
const PreferenceController = require("../controllers/PreferenceController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;

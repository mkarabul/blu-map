const express = require("express");
const SocialController = require("../controllers/SocialPostController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/:uuid",
  checkJwt,
  getUserInfoMiddleware,
  SocialController.setPostSocial
);

module.exports = router;

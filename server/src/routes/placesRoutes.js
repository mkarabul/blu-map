const PlacesController = require("../controllers/PlacesController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

router.get(
  "/places",
  checkJwt,
  getUserInfoMiddleware,
  PlacesController.getPlaces
);

module.exports = router;

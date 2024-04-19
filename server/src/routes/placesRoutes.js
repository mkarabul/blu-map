const PlacesController = require("../controllers/PlacesController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

router.get("/", PlacesController.getPlaces);

router.post("/city", PlacesController.getCity);

module.exports = router;

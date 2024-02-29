const ItineraryController = require("../controllers/ItineraryController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

router.get(
  "/",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.getAllItineraries
);
router.get(
  "/:id",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.getItinerary
);
router.get(
  "/user/:userId",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.getUserItineraries
);
router.post(
  "/",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.createItinerary
);
router.put(
  "/:id",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.updateItinerary
);
router.delete(
  "/:id",
  checkJwt,
  getUserInfoMiddleware,
  ItineraryController.deleteItinerary
);

module.exports = router;

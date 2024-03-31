const express = require("express");
const RecommendationController = require("../controllers/RecommendationController");

const router = express.Router();

router.get("/", RecommendationController.getAllRecommendations);
router.post(
  "/:userId/:activity",
  RecommendationController.createRecommendation
);
router.get("/user/:userId", RecommendationController.getUserRecommendations);
router.delete(
  "/:userId/:activity",
  RecommendationController.deleteRecommendation
);

module.exports = router;

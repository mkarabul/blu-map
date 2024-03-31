const Recommendation = require("../models/Recommendation");

const RecommendationController = {
  async getAllRecommendations(req, res) {
    try {
      const recommendations = await Recommendation.findAll();
      res.status(200).json(recommendations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getUserRecommendations(req, res) {
    try {
      const userId = req.params.userId;

      //   if (req.user.sub !== userId) {
      //     return res.status(403).json({ error: "User not authorized" });
      //   }

      const recommendations = await Recommendation.findAll({
        where: {
          userId,
        },
      });
      res.status(200).json(recommendations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createRecommendation(req, res) {
    try {
      const activity = req.params.activity;
      const userId = req.params.userId;

      const existingRecommendation = await Recommendation.findOne({
        where: { userId, activity },
      });

      if (existingRecommendation) {
        return res.status(400).json({ error: "Recommendation already exists" });
      }

      const recommendation = await Recommendation.create({ userId, activity });

      res.status(201).json(recommendation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteRecommendation(req, res) {
    try {
      const userId = req.params.userId;
      const activity = req.params.activity;
      const recommendation = await Recommendation.destroy({
        where: { userId, activity },
      });
      if (!recommendation) {
        return res.status(404).json({ error: "Recommendation not found" });
      }
      res.json({ message: "Recommendation deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = RecommendationController;

const Activity = require("../models/Activity");

const ShareItineraryController = {
  async shareActivity(req, res) {
    try {
      const { userId, activityId, activityType, frequency, preferences } =
        req.body;

      // format activity data for compatibility with social media platforms
      const formattedContent = `User ${userId} is planning ${activityType} ${frequency}.`;

      // save the shared activity to the database
      const sharedActivity = await Activity.create({
        activityId,
        userId,
        activityType,
        frequency,
        preferences,
      });

      // 201 status code indicates that a new resource has been created
      res.status(201).json(sharedActivity);
    } catch (error) {
      console.error("Error sharing activity:", error);
      res.status(500).json({ error: "Error sharing activity" });
    }
  },
};

module.exports = ShareItineraryController;

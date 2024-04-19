const Preference = require("../models/Preference");

const PreferenceController = {
  async getPreferences(req, res) {
    try {
      const { userId } = req.params;
      const preference = await Preference.findOne({
        where: { userId },
        attributes: [
          "activityPreferences",
          "locationPreferences",
          "interestPreferences",
        ],
      });
      res.status(200).json(preference);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = PreferenceController;

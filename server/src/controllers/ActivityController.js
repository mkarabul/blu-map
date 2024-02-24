const { Activity } = require("../models/Activity");

const getFrequentlyPlannedActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    // ?sortBy=frequency or ?sortBy=preference
    const sortBy = req.query.sortBy;

    // fetch frequently planned activities for the user from the database
    let activities = await Activity.findAll({
      where: { userId },
    });

    // sort the activities based on the user choice (frequency or preference)
    if (sortBy === "frequency") {
      // sort the activities array based on the frequency
      activities = activities.sort((a, b) =>
        a.frequency.localeCompare(b.frequency)
      );
    } else if (sortBy === "preference") {
      activities = activities.sort((a, b) => {
        // preferences are numbers, subtract b.preferences from a.preferences to sort in
        // ascending order of preference, so the highest preference would be displayed first
        return a.preferences - b.preferences;
      });
    } else {
      // if user doesn't provide preferences, sort the activities based on their id
      activities = activities.sort((a, b) => a.id - b.id);
    }
    // 200 status code indicates that the request has succeeded
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching frequently planned activities:", error);
    res
      .status(500)
      .json({ error: "Error fetching frequently planned activities" });
  }
};

module.exports = getFrequentlyPlannedActivities;

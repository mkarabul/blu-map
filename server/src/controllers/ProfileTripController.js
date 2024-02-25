const ProfileTrip = require("../models/ProfileTrip");

const ProfileTripsController = {
  async createProfileTrip(req, res) {
    try {
      const { userId, tripName, description, header, tripTime } = req.body;
      const newProfileTrip = await ProfileTrip.create({
        userId,
        tripName,
        description,
        header,
        tripTime,
      });
      res.status(201).json(newProfileTrip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProfileTripsController;

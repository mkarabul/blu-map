const ProfileTrip = require("../models/ProfileTrip");

const ProfileTripsController = {
  async createProfileTrip(req, res) {
    try {
      const { userId, userName, description, header, tripDate, isPublic } =
        req.body;
      const newProfileTrip = await ProfileTrip.create({
        userId,
        userName,
        description,
        header,
        tripDate,
        isPublic,
      });
      res.status(201).json(newProfileTrip);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getProfileTrips(req, res) {
    try {
      const { userId } = req.params;
      if (req.user.sub !== userId) {
        return res.status(403).json({ error: "User not authorized" });
      }
      const profileTrips = await ProfileTrip.findAll({
        where: { userId },
        attributes: [
          "uuid",
          "userName",
          "description",
          "header",
          "tripDate",
          "isPublic",
          "isSocial",
        ],
      });
      res.status(200).json(profileTrips);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getTripById(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({
        where: { uuid },
        attributes: [
          "uuid",
          "userName",
          "description",
          "header",
          "tripDate",
          "isPublic",
          "isSocial",
        ],
      });
      // if (req.user.sub !== userId) {
      //   return res.status(403).json({ error: "User not authorized" });
      // }
      if (!profileTrip.isPublic) {
        return res.status(403).json({ error: "Trip is not public" });
      }
      res.status(200).json(profileTrip);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getSocialProfileTrips(req, res) {
    try {
      const profileTrips = await ProfileTrip.findAll({
        where: { isSocial: true },
        attributes: [
          "id",
          "uuid",
          "userName",
          "description",
          "header",
          "tripDate",
        ],
      });
      res.status(200).json(profileTrips);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProfileTripsController;

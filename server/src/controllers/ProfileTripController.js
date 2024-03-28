const ProfileTrip = require("../models/ProfileTrip");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");

const ProfileTripsController = {
  async createProfileTrip(req, res) {
    try {
      const { userId, userName, description, header, tripDate, tripId } =
        req.body;
      const newProfileTrip = await ProfileTrip.create({
        userId,
        userName,
        description,
        header,
        tripDate,
        tripId,
      });
      res.status(201).json(newProfileTrip);
    } catch (error) {
      console.error(error);
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
          "tripId",
        ],
      });
      // likeDislike = null;
      // for (let i = 0; i < profileTrips.length; i++) {
      // check if Likes contain a row with uuid and req.user.sub
      // check if Dislikes contain a row with uuid and req.user.sub
      // }

      // for (let i = 0; i < profileTrips.length; i++) {
      //   const uuid = profileTrips[i].uuid;
      //   const userId = req.user.sub;

      //   let likeDislike = null;

      //   const like = await Like.findOne({
      //     where: { postId: uuid, userId: userId },
      //   });

      //   const dislike = await Dislike.findOne({
      //     where: { postId: uuid, userId: userId },
      //   });

      //   if (like) {
      //     likeDislike = "like";
      //   }

      //   if (dislike) {
      //     likeDislike = "dislike";
      //   }
      // }

      res.status(200).json(profileTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPublicProfileTrips(req, res) {
    try {
      const { userName } = req.params;
      const publicProfileTrips = await ProfileTrip.findAll({
        where: { userName, isPublic: true },
        attributes: ["uuid", "userName", "description", "header", "tripDate"],
      });
      res.status(200).json(publicProfileTrips);
    } catch (error) {
      console.error(error);
      console.error(error);
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
          "tripId",
          "likes",
          "dislikes",
          "comments",
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
      console.error(error);
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
          "tripId",
          "isPublic",
        ],
      });
      res.status(200).json(profileTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async togglePublicbyUUID(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({
        where: { uuid },
      });

      profileTrip.isPublic = !profileTrip.isPublic;
      await profileTrip.save();

      res.status(200).json({
        message: `Post is ${profileTrip.isPublic ? "public" : "private"} now`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async togglePublicbyUUID(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({
        where: { uuid },
      });

      profileTrip.isPublic = !profileTrip.isPublic;
      await profileTrip.save();

      res.status(200).json({
        message: `Post is ${profileTrip.isPublic ? "public" : "private"} now`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProfileTripsController;

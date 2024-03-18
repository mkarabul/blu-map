const ProfileTrip = require("../models/ProfileTrip");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

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
      res.status(200).json(profileTrips);
    } catch (error) {
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
          "tripId",
        ],
      });
      res.status(200).json(profileTrips);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updateTripImages(req, res) {
    const { tripId } = req.params;
    const images = req.files;
    console.log("images", images);
    for (let i = 0; i < images.length; i++) {
      const { originalname, buffer, mimetype } = images[i];
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${tripId}/${originalname}`,
        Body: buffer,
        ContentType: mimetype,
      };
      try {
        await s3Client.send(new PutObjectCommand(params));
        res.status(200).json({ message: "Image uploaded successfully" });
      } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    // try {
    //   const profileTrip = await ProfileTrip.findOne({ where: { tripId } });
    //   if (!profileTrip) {
    //     return res.status(404).json({ error: "Trip not found" });
    //   }
    //   if (req.user.sub !== profileTrip.userId) {
    //     return res.status(403).json({ error: "User not authorized" });
    //   }
    //   profileTrip.images = images;
    //   await profileTrip.save();
    //   res.status(200).json(profileTrip);
    // } catch (error) {
    //   res.status(500).json({ error: "Internal Server Error" });
    // }
  },
};

module.exports = ProfileTripsController;

const ProfileTrip = require("../models/ProfileTrip");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

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
          "images",
        ],
      });
      for (let i = 0; i < profileTrips.length; i++) {
        const imageUrls = [];
        for (let j = 0; j < profileTrips[i].images.length; j++) {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${profileTrips[i].tripId}/${profileTrips[i].images[j]}`,
          });
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          imageUrls.push(url);
        }
        profileTrips[i].images = imageUrls;
      }
      res.status(200).json(profileTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPublicProfileTrips(req, res) {
    try {
      const { userName } = req.params;
      const profileTrips = await ProfileTrip.findAll({
        where: { userName, isPublic: true },
        attributes: [
          "uuid",
          "userName",
          "description",
          "header",
          "tripDate",
          "tripId",
          "images",
        ],
      });
      for (let i = 0; i < profileTrips.length; i++) {
        const imageUrls = [];
        for (let j = 0; j < profileTrips[i].images.length; j++) {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${profileTrips[i].tripId}/${profileTrips[i].images[j]}`,
          });
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          imageUrls.push(url);
        }
        profileTrips[i].images = imageUrls;
      }
      res.status(200).json(profileTrips);
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
          "images",
        ],
      });
      if (!profileTrip.isPublic) {
        return res.status(403).json({ error: "Trip is not public" });
      }
      const imageUrls = [];
      for (let i = 0; i < profileTrip.images.length; i++) {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `${profileTrip.tripId}/${profileTrip.images[i]}`,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        imageUrls.push(url);
      }
      profileTrip.images = imageUrls;
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
          "images",
        ],
      });
      for (let i = 0; i < profileTrips.length; i++) {
        const imageUrls = [];
        for (let j = 0; j < profileTrips[i].images.length; j++) {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${profileTrips[i].tripId}/${profileTrips[i].images[j]}`,
          });
          const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
          });
          imageUrls.push(url);
        }
        profileTrips[i].images = imageUrls;
      }
      res.status(200).json(profileTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async incrementLikes(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({ where: { uuid } });
      profileTrip.increment("likes");
      res.status(200).json(profileTrip);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async incrementDislikes(req, res) {
    try {
      const { uuid } = req.params;
      const profileTrip = await ProfileTrip.findOne({ where: { uuid } });
      profileTrip.increment("dislikes");
      res.status(200).json(profileTrip);
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
  async updateTripImages(req, res) {
    const { tripId } = req.params;
    const images = req.files;
    const imageArray = [];
    for (let i = 0; i < images.length; i++) {
      const { originalname, mimetype } = images[i];
      const buffer = await sharp(images[i].buffer)
        .resize({
          height: 600,
          width: 800,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toBuffer();
      const uniqueName = `${uuidv4()}-${originalname}`;
      imageArray.push(uniqueName);
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${tripId}/${uniqueName}`,
        Body: buffer,
        ContentType: mimetype,
      };
      try {
        await s3Client.send(new PutObjectCommand(params));
      } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    try {
      const profileTrip = await ProfileTrip.findOne({ where: { tripId } });
      if (!profileTrip) {
        return res.status(404).json({ error: "Trip not found" });
      }
      if (req.user.sub !== profileTrip.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }
      profileTrip.images = imageArray;
      await profileTrip.save();
      res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getTripImages(req, res) {
    const { tripId } = req.params;
    try {
      const profileTrip = await ProfileTrip.findOne({ where: { tripId } });
      if (!profileTrip) {
        return res.status(404).json({ error: "Trip not found" });
      }
      const images = profileTrip.images;
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const command = new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `${tripId}/${images[i]}`,
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        imageUrls.push(url);
      }
      res.status(200).json(imageUrls);
    } catch (error) {
      console.error("Error getting images: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProfileTripsController;

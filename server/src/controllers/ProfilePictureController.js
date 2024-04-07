const ProfilePicture = require("../models/ProfilePicture");
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

const ProfilePictureController = {
  async uploadProfilePicture(req, res) {
    const { userId } = req.params;
    const image = req.file;
    const { originalname, mimetype } = image;
    const buffer = await sharp(image.buffer)
      .resize({
        height: 300,
        width: 300,
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .toBuffer();
    const uniqueName = `${uuidv4()}-${originalname}`;

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${userId}/${uniqueName}`,
      Body: buffer,
      ContentType: mimetype,
    };

    try {
      await s3Client.send(new PutObjectCommand(params));
      const profilePicture = await ProfilePicture.findOne({
        where: { userId },
      });
      if (profilePicture) {
        profilePicture.imageUrl = `${userId}/${uniqueName}`;
        await profilePicture.save();
      } else {
        await ProfilePicture.create({
          userId,
          userName: req.user.name,
          imageUrl: `${userId}/${uniqueName}`,
        });
      }
      res
        .status(200)
        .json({ message: "Profile picture uploaded successfully" });
    } catch (error) {
      console.error("Error uploading profile picture: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProfilePicture(req, res) {
    const { userId } = req.params;
    try {
      const profilePicture = await ProfilePicture.findOne({
        where: { userId },
      });
      if (!profilePicture || !profilePicture.imageUrl) {
        return res.status(404).json({ error: "Profile picture not found" });
      }
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: profilePicture.imageUrl,
      });
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      res.status(200).json({ imageUrl: url });
    } catch (error) {
      console.error("Error getting profile picture: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteProfilePicture(req, res) {
    const { userId } = req.params;
    try {
      const profilePicture = await ProfilePicture.findOne({
        where: { userId },
      });
      if (!profilePicture) {
        return res.status(404).json({ error: "Profile picture not found" });
      }

      const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: profilePicture.imageUrl,
      });
      await s3Client.send(command);

      await profilePicture.destroy();
      res.status(200).json({ message: "Profile picture deleted successfully" });
    } catch (error) {
      console.error("Error deleting profile picture: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateProfilePicture(req, res) {
    const { userId } = req.params;
    const image = req.file;

    try {
      const existingProfilePicture = await ProfilePicture.findOne({
        where: { userId },
      });

      if (existingProfilePicture && existingProfilePicture.imageUrl) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: existingProfilePicture.imageUrl,
        });
        await s3Client.send(deleteCommand);
      }

      const { originalname, mimetype } = image;
      const buffer = await sharp(image.buffer)
        .resize({
          height: 300,
          width: 300,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toBuffer();
      const uniqueName = `${uuidv4()}-${originalname}`;
      const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${userId}/${uniqueName}`,
        Body: buffer,
        ContentType: mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      if (existingProfilePicture) {
        existingProfilePicture.imageUrl = `${userId}/${uniqueName}`;
        await existingProfilePicture.save();
      } else {
        await ProfilePicture.create({
          userId,
          userName: req.user.name,
          imageUrl: `${userId}/${uniqueName}`,
        });
      }

      res.status(200).json({ message: "Profile picture updated successfully" });
    } catch (error) {
      console.error("Error updating profile picture: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProfilePictureController;

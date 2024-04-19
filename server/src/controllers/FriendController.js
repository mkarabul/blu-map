const Friend = require("../models/Friend");
const User = require("../models/User");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const FriendController = {
  async getUserFriends(req, res) {
    const { userId } = req.params;
    const friendId = userId;
    try {
      let friends = await Friend.findAll({
        where: { userId, isPending: false },
        attributes: [
          [Friend.sequelize.literal('"friendUserName"'), "userName"],
        ],
      });

      const friends2 = await Friend.findAll({
        where: { friendId, isPending: false },
        attributes: ["userName"],
      });

      friends = friends.concat(friends2);
      for (let i = 0; i < friends.length; i++) {
        const user = await User.findOne({
          where: { userName: friends[i].userName },
          attributes: ["userId", "image"],
        });
        if (user.image === null) {
          friends[i].dataValues.userPhoto = null;
        } else {
          const command2 = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${user.userId}/${user.image}`,
          });
          const url2 = await getSignedUrl(s3Client, command2, {
            expiresIn: 3600,
          });
          friends[i].dataValues.userPhoto = url2;
        }
      }
      res.status(200).json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async isFriend(req, res) {
    const { userName, userId } = req.params;
    const friendId = userId;
    try {
      let friend = await Friend.findOne({
        where: { userName, friendId },
      });
      if (friend === null) {
        friend = await Friend.findOne({
          where: { friendUserName: userName, userId },
        });
      }
      if (friend === null) {
        res.status(200).json({ isFriend: false, isPending: false });
      } else {
        const isPending = friend.isPending;
        if (isPending) {
          res.status(200).json({ isFriend: false, isPending: true });
        } else {
          res.status(200).json({ isFriend: true, isPending: false });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async addFriend(req, res) {
    const { userName } = req.params;
    const { userId } = req.body;
    try {
      const friend = await User.findOne({ where: { userName } });
      const friendId = friend.userId;
      const user = await User.findOne({
        where: { userId: userId },
      });
      const currentUser = user.userName;
      await Friend.create({
        userName: currentUser,
        userId,
        friendUserName: userName,
        friendId,
      });
      res.status(201).json({ message: "Friend request sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async acceptFriend(req, res) {
    const { userName } = req.params;
    const { userId } = req.body;
    try {
      const friend = await Friend.findOne({
        where: { userName, friendId: userId },
      });
      if (!friend) {
        return res.status(404).json({ error: "Friend request not found" });
      }
      friend.isPending = false;
      await friend.save();
      res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async rejectFriend(req, res) {
    const { userName } = req.params;
    const { userId } = req.body;
    try {
      const friend = await Friend.findOne({
        where: { userName, friendId: userId },
      });
      if (!friend) {
        return res.status(404).json({ error: "Friend request not found" });
      }
      await friend.destroy();
      res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPendingFriends(req, res) {
    const { userId } = req.params;
    try {
      const friends = await Friend.findAll({
        where: { friendId: userId, isPending: true },
        attributes: ["userName"],
      });
      for (let i = 0; i < friends.length; i++) {
        const user = await User.findOne({
          where: { userName: friends[i].userName },
          attributes: ["userId", "image"],
        });
        if (user.image === null) {
          friends[i].dataValues.userPhoto = null;
        } else {
          const command2 = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${user.userId}/${user.image}`,
          });
          const url2 = await getSignedUrl(s3Client, command2, {
            expiresIn: 3600,
          });
          friends[i].dataValues.userPhoto = url2;
        }
      }
      res.status(200).json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async deleteFriend(req, res) {
    const { userName } = req.params;
    const { userId } = req.body;
    const friendId = userId;
    try {
      let friend = await Friend.findOne({
        where: { userName, friendId },
      });
      if (friend === null) {
        friend = await Friend.findOne({
          where: { friendUserName: userName, userId },
        });
      }
      if (friend === null) {
        return res.status(404).json({ error: "Friend not found" });
      }
      await friend.destroy();
      res.status(200).json({ message: "Friend deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = FriendController;

const Friend = require("../models/Friend");
const User = require("../models/User");

const FriendController = {
  async getUserFriends(req, res) {
    const { userId } = req.params;
    const friendId = userId;
    console.log("userId", userId);
    try {
      const friends = await Friend.findAll({
        where: { userId, isPending: false },
        attributes: ["friendUserName"],
      });
      if (friends.length === 0) {
        const friends = await Friend.findAll({
          where: { friendId, isPending: false },
          attributes: ["userName"],
        });
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
    const { userName, friendUserId } = req.body;
    try {
      const friend = await Friend.findOne({
        where: { userId: friendUserId, friendUserName: userName },
      });
      friend.isPending = false;
      await friend.save();
      res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = FriendController;

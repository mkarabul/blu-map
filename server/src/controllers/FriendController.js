const Friend = require("../models/Friend");
const User = require("../models/User");

const FriendController = {
  async getUserFriends(req, res) {
    const userId = req.params.userId;
    const friendId = req.params.userId;
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async isFriend(req, res) {
    const { userId, friendUserName } = req.body;
    const friendId = userId;
    const userName = friendUserName;
    try {
      const friend = await Friend.findOne({
        where: { userId, friendUserName, isPending: false },
      });
      if (friend === null) {
        const friend = await Friend.findOne({
          where: { friendId, userName, isPending: false },
        });
      }
      if (friend) {
        res.status(200).json({ isFriend: true });
      } else {
        res.status(200).json({ isFriend: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async addFriend(req, res) {
    const { userId, friendUserName } = req.body;
    try {
      const user = await User.findOne({ where: { userId } });
      const userName = user.userName;
      const friend = await User.findOne({
        where: { userName: friendUserName },
      });
      const friendUserId = friend.userId;
      await Friend.create({ userName, userId, friendUserName, friendUserId });
      res.status(201).json({ message: "Friend request sent successfully" });
    } catch (error) {
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
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = FriendController;

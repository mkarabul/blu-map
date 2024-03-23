const followRequest = require("../models/followRequest");

const followRequestController = {
  async getAllInfo( req, res ) {
    try {
      const followRequests = await followRequest.findAll();
      res.status(200).json(followRequests);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getFollowerRequest(req, res) {
    const userName = req.params.userName;
    try {
      const followers = await followRequest.findAll({
        where: { followingUserName: userName }
      });
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

//   async getFollowRequests(req, res) {
//     const userName = req.params.userName;
//     try {
//       const following = await followRequest.findAll({
//         where: { userName: userName }
//       });
//       res.status(200).json(following);
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   },

  async createFollowRequest(req, res) {
    const { userName, followingUserName } = req.body;
    try {
      await followRequest.create({ userName, followingUserName });
      res.status(201).json({ message: "Follow request created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async cancelFollowRequest(req, res) {
    const { userName, followingUserName } = req.body;

    try {
      const result = await followRequest.destroy({
        where: { userName, followingUserName }
      });
      if (result === 1) {
        res.status(200).json({ message: "User unfollowed successfully" });
      } else {
        res.status(404).json({ error: "Follow relationship not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
};

module.exports = followRequestController;

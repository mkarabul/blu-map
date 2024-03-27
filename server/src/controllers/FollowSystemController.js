const followSystem = require("../models/followSystem");

const FollowSystemController = {
  async getAllInfo( req, res ) {
    try {
      const followSystems = await followSystem.findAll();
      res.status(200).json(followSystems);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getFollowers(req, res) {
    const userName = req.params.userName;
    try {
      const followers = await followSystem.findAll({
        where: { followingUserName: userName }
      });
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getFollowing(req, res) {
    const userName = req.params.userName;
    try {
      const following = await followSystem.findAll({
        where: { userName: userName }
      });
      res.status(200).json(following);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createFollowRelationship(req, res) {
    const { userName, followingUserName } = req.body;
    try {
      await followSystem.create({ userName, followingUserName });
      res.status(201).json({ message: "Follow relationship created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async unfollowUser(req, res) {
    const { userName, followingUserName } = req.body;
    console.log(userName);
    console.log(followingUserName);
    try {
      const result = await followSystem.destroy({
        where: { userName, followingUserName }
      });
      if (result === 1) {
        res.status(200).json({ message: "User unfollowed successfully" });
      } else {
        res.status(404).json({ error: `${userName} ${followingUserName}` });
      }
    } catch (error) {
      res.status(500).json({ error: `${userName} ${followingUserName}` });
    }
  }
  
};

module.exports = FollowSystemController;

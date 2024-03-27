const Like = require("../models/Like");

const LikeController = {
  async createLike(req, res) {
    try {
      const { postId, userId } = req.body;
      console.log("hello from like controller");
      console.log(req.body);
      const newLike = await Like.create({
        postId,
        userId,
      });
      res.status(201).json(newLike);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getLikeByPost(req, res) {
    try {
      const { postId } = req.params;
      const likes = await Like.findAll({
        where: { postId },
      });
      res.json(likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = LikeController;

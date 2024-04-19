const Like = require("../models/Like");
const Dislike = require("../models/Dislike");

const LikeController = {
  async createLike(req, res) {
    try {
      const { postId, userId } = req.body;
      const existingLike = await Like.findOne({
        where: { postId, userId },
      });

      const existingDislike = await Dislike.findOne({
        where: { postId, userId },
      });

      if (existingDislike) {
        await Dislike.destroy({
          where: { postId, userId },
        });
      }

      if (existingLike) {
        await Like.destroy({
          where: { postId, userId },
        });
        return res.status(204).send();
      } else {
        const newLike = await Like.create({ postId, userId });
        return res.status(201).json(newLike);
      }
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
  //get likes count for user
  async getUserLikesCount(req, res) {
    try {
      const { userId } = req.params;
      const likes = await Like.findAll({
        where: { userId },
      });
      res.json({ totalLikes: likes.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = LikeController;

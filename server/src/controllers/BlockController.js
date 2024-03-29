const Block = require("../models/Block");
const User = require("../models/User");

const BlockController = {
  async createBlock(req, res) {
    try {
      const { userName, blockerId } = req.params;
      const { userId } = await User.findOne({ where: { userName } });

      const newBlock = await Block.create({
        userId: blockerId,
        blockedUserId: userId,
      });

      res.status(201).json(newBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async removeBlock(req, res) {
    try {
      const { userName, blockerId } = req.params;
      const { userId } = await User.findOne({ where: { userName } });

      const block = await Block.findOne({
        where: { userId: blockerId, blockedUserId: userId },
      });

      if (!block) {
        return res.status(404).json({ error: "Block not found" });
      }

      await block.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getBlockedUsers(req, res) {
    try {
      const { userName } = req.params;
      const { userId } = await User.findOne({ where: { userName } });

      const blockedUsers = await Block.findAll({
        where: { userId },
      });
      res.json(blockedUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getBlocked(req, res) {
    try {
      const { userName, blockerId } = req.params;
      const { userId } = await User.findOne({ where: { userName } });

      const blockedUsers = await Block.findOne({
        where: { userId: blockerId, blockedUserId: userId },
      });

      res.json(blockedUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async isBlocked(req, res) {
    try {
      const { userName, blockedUserId } = req.params;

      const { userId } = await User.findOne({ where: { userName } });

      const block = await Block.findOne({
        where: { userId: userId, blockedUserId },
      });
      res.json({ blocked: !!block });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = BlockController;

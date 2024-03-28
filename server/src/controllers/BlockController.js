const Block = require("../models/Block");

const BlockController = {
  async createBlock(req, res) {
    try {
      const { userId, blockedUserId } = req.body;
      const newBlock = await Block.create({
        userId,
        blockedUserId,
      });
      res.status(201).json(newBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async removeBlock(req, res) {
    try {
      const { userId, blockedUserId } = req.body;
      const block = await Block.findOne({
        where: { userId, blockedUserId },
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
      const { userId } = req.params;
      const blockedUsers = await Block.findAll({
        where: { userId },
      });
      res.json(blockedUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = BlockController;

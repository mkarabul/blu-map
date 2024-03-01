const Notification = require("../models/Notification");

const NotificationController = {
  async createNotification(req, res) {
    try {
      const { userId } = req.params;
      const { hour, minute } = req.body;
      const newNotification = await Notification.create({
        userId,
        hour,
        minute,
      });
      res.status(201).json(newNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getNotificationByUserId(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await Notification.findAll({
        where: { userId },
        attributes: ["id", "hour", "minute"],
      });
      res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async deleteNotificationById(req, res) {
    try {
      const { id } = req.params;
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }
      await notification.destroy();
      res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = NotificationController;

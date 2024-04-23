const User = require("../models/User");
const AdminNotification = require("../models/AdminNotification");

const {
    generateFromEmail,
    generateUsername,
  } = require("unique-username-generator");


const UserController = {
  
    async getAllUsers(req, res) {
        try {
          const users = await User.findAll({
            attributes: [
              "userId",
              "userName",
              "email",
              "age",
              "gender",
              "isSuspended",
              "isDarkMode",
              "isAdmin",
              "isPublic",
              "isVerified",
              "createdAt"
            ],
          });
          res.status(200).json(users);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      },


  async getUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      
      const user = await User.findOne({
        where: { userId },
        attributes: [
          "userId",
          "userName",
          "email",
          "age",
          "gender",
          "isSuspended",
          "isDarkMode",
          "isAdmin",
          "isPublic",
          "isVerified"

        ],
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createUser(req, res) {
    try {
      const { userId, email, age, gender, isSuspended, isAdmin, isDarkMode } = req.body;

      if (!userId || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const userName = generateUsername("", 3);


      const user = await User.create({
        userId,
        userName,
        email,
        age,
        gender,
        isSuspended,
        isAdmin,
        isDarkMode,
      });

      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  
  async deleteUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.destroy({
        where: { userId },
      });
      if (user) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async toggleUserAdminStatusById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });

        user.isAdmin = !user.isAdmin;
      await user.save();
  
      res.status(200).json({
        message: `User has been ${user.isAdmin ? "granted admin rights" : "revoked admin rights"} successfully.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async toggleUserDarkModeById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.isSuspended = !user.isSuspended;
      await user.save();

      res.status(200).json({
        message: `User ${
          user.isSuspended ? "suspended" : "unsuspended"
        } successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async toggleUserSuspensionById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.isSuspended = !user.isSuspended;
      await user.save();

      res.status(200).json({
        message: `User ${
          user.isSuspended ? "suspended" : "unsuspended"
        } successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async postAdminNotification(req, res) {
    try {
      const { userId, header, description } = req.body;
  
      if (!userId || !header || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const notification = await AdminNotification.create({
        userId,
        header,
        description,
      });
  
      res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async getNotificationsByUserId(req, res) {
    try {
      const { userId } = req.params;
  
      const notifications = await AdminNotification.findAll({
        where: { userId },
      });
  
      if (notifications.length > 0) {
        res.status(200).json(notifications);
      } else {
        res.status(404).json({ error: "No notifications found for the user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
  async getAllNotifications(req, res) {
    try {
      const notifications = await AdminNotification.findAll();
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteNotificationById(req, res) {
    try {
      const { notificationId } = req.params;
      
      const deleted = await AdminNotification.destroy({
        where: { Id: notificationId },
      });

      if (deleted) {
        res.status(200).json({ message: "Notification deleted successfully" });
      } else {
        res.status(404).json({ error: "Notification not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};




module.exports = UserController;

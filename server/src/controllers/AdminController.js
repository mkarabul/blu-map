const User = require("../models/User");

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
              "reportNum",
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
          "reportNum",
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

  async incrementUserReportCount(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.reportNum = user.reportNum + 1; 
      await user.save();
  
      res.status(200).json({
        message: "User's report count incremented successfully",
        user: {
          userId: user.userId,
          reportNum: user.reportNum
        }
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  },

  async decrementUserReportCount(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.reportNum <= 0) {
        return res.status(400).json({ error: "User's report count cannot be decremented further" });
      }
  
      user.reportNum = user.reportNum - 1; 
      await user.save();
  
      res.status(200).json({
        message: "User's report count incremented successfully",
        user: {
          userId: user.userId,
          reportNum: user.reportNum
        }
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" }); 
    }
  }
  
};


module.exports = UserController;

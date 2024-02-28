const User = require('../models/User');

const UserController = {
  // Method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['userId', 'userName', 'email', 'age', 'gender', 'isSuspended']
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Method to get a user by userId
  async getUserByUserId(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { userId },
        attributes: ['userId', 'userName', 'email', 'age', 'gender', 'isSuspended']
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createUser(req, res) {
    try {
      const { userName, email, age, gender, isSuspended } = req.body;

      if (!userName || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await User.create({ userName, email, age, gender, isSuspended });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteUserByUserId(req, res) {
    try {
        const { userId } = req.params;
        const user = await User.destroy({
            where: { userId },
        });
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async toggleUserSuspensionById(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { userId } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.isSuspended = !user.isSuspended;
      await user.save();
  
      res.status(200).json({ message: `User ${user.isSuspended ? 'suspended' : 'unsuspended'} successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;

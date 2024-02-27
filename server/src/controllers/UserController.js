const User = require('../models/User');

const UserController = {
  // Method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['username', 'email', 'age', 'gender', 'isSuspended']
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Method to get a user by username
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({
        where: { username },
        attributes: ['username', 'email', 'age', 'gender', 'isSuspended']
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
      const { username, email, age, gender, isSuspended } = req.body;

      if (!username || !email || !age || !gender) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await User.create({ username, email, age, gender, isSuspended });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = UserController;

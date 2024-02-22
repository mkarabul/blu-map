const User = require('../models/User');

const UserController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({ username, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const {
  generateFromEmail,
  generateUsername,
} = require("unique-username-generator");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    defaultValue: generateUsername("", 3),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: -1,
    },

    defaultValue: -1,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  isSuspended: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDarkMode: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    defaultValue: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    defaultValue: true
  }
});

User.sync({ alter: true });

module.exports = User;

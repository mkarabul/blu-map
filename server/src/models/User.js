const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    validate: {
      isUUID: 4,
    },
    defaultValue: DataTypes.UUIDV4,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    defaultValue: -1
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Male"
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
    defaultValue: false
  }
});

User.sync({ alter: true });

module.exports = User;

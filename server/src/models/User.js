const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const generateUserName = require("../config/usernameGenerator");

const User = sequelize.define("User", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   autoIncrement: true,
  //   unique: true,
  // },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: generateUserName,
  },
  profileName: {
    type: DataTypes.STRING,
    defaultValue: "",
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
    defaultValue: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    defaultValue: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    defaultValue: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    defaultValue: false,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

User.sync({ alter: true });

module.exports = User;

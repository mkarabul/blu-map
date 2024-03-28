const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true,
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hour: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 23,
    },
  },
  minute: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 59,
    },
  },
});

Notification.sync({ alter: true });

module.exports = Notification;

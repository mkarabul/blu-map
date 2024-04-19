const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AdminNotification = sequelize.define("AdminNotification", {
  Id: {
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
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

}, {});

AdminNotification.sync({ alter: true });

module.exports = AdminNotification;

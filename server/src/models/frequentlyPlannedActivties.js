// database schema to track and store users' frequently planned activities
// changes can still be made (rough draft)

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FrequentlyPlannedActivity = sequelize.define("Activity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferences: {
    type: DataTypes.JSON, // JSON data type to store preferences
    allowNull: true, // allow null as it might not always be provided
  },
});

module.exports = FrequentlyPlannedActivity;

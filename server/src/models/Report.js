const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Report = sequelize.define("Report", {
  reportId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      isInt: true,
    },
  },
  reporterUserID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reportedUserName: {
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
  reportType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {});

Report.sync({ alter: true });

module.exports = Report;

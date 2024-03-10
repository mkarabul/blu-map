const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require('uuid');

const Report = sequelize.define("Report", {
  reportId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  reporterUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reportedUserId: {
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
}, {
});

Report.sync({ alter: true });

module.exports = Report;

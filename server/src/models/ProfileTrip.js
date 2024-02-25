const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProfileTrip = sequelize.define("ProfileTrip", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: 0,
    unique: true,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    validate: {
      isUUID: 4,
    },
    defaultValue: DataTypes.UUIDV4,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tripName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

ProfileTrip.sync();

module.exports = ProfileTrip;

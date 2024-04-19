const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProfileTrip = sequelize.define("ProfileTrip", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
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
  tripDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Unknown",
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Unknown",
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isSocial: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tripId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

ProfileTrip.sync({ alter: true });

module.exports = ProfileTrip;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { use } = require("../routes/profileTripRoutes");

const Comment = sequelize.define("Comment", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Comment.sync();

module.exports = Comment;

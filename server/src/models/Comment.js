const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { use } = require("../routes/profileTripRoutes");

const Comment = sequelize.define("Comment", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "ProfileTrip",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Comment.sync();

module.exports = Comment;

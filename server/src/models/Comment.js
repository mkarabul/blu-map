const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { use } = require("../routes/profileTripRoutes");

const Comment = sequelize.define("Comment", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
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
});

Comment.sync({ alter: true });

module.exports = Comment;

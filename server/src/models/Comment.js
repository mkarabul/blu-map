const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("Comment", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Posts",
      key: "id",
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Comment.sync();

module.exports = Comment;

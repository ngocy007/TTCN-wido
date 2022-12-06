const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Like_Comment extends Model {}

Like_Comment.init(
  {
    id_lp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id_user",
      },
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Post",
        key: "id_post",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Like_Comment",
  }
);
module.exports = Like_Comment;

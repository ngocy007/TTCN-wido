const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Like_Comment extends Model {}

Like_Comment.init(
  {
    id_lc: {
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
    id_com: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Comment",
        key: "id_com",
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

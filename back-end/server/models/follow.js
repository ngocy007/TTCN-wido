const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Follow extends Model {}

Follow.init(
  {
    id_fol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id_user",
      },
    },
    id_followee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id_user",
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Follow",
  }
);
module.exports = Follow;
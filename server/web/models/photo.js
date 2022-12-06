const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {}

Photo.init(
  {
    id_photo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id_post',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Photo',
  }
);

module.exports = Photo;

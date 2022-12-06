const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    gender: {
      type: DataTypes.SMALLINT,
    },
    content: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.SMALLINT,
    },
    dob: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://bulma.io/images/placeholders/128x128.png",
    },
  },
  {
    hooks: {
      // hash mật khẩu trước khi tạo
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;

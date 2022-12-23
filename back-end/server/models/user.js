const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const jwt = require("jsonwebtoken");

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
      type: DataTypes.STRING,
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
      defaultValue: 1,
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
        newUserData.name = newUserData.name.toLowerCase();
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        if (updatedUserData.name) {
          updatedUserData.name = updatedUserData.name.toLowerCase();
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

User.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.id_user }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// So sánh mật khẩu
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;

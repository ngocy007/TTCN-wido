import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    // post_image: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, //Bắt buộc tên bảng phằng tên model
    underscored: true,
    modelName: "post",
  }
);

export default Post;

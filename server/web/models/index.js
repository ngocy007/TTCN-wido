const Post = require("./post.js");
const Photo = require("./photo.js");
const Like_Post = require("./like_post");
const User = require("./user");
const { post } = require("../routes/PostRoute.js");

// Quan hệ của Post vs Photo
Post.hasMany(Photo, {
  foreignKey: "id_post",
});

Photo.belongsTo(Post, {
  foreignKey: "id_post",
});

// Quan hệ User với Post
User.hasMany(Post, {
  foreignKey: "id_user",
});
Post.belongsTo(User, {
  foreignKey: "id_user",
});

// Quan hệ Post với Like_Post
Post.hasMany(Like_Post, {
  foreignKey: 'id_post',
});

Like_Post.belongsTo(Post, {
  foreignKey: 'id_post',
});

Like_Post.belongsTo(User, {
  foreignKey: 'id_user',
});

User.hasMany(Like_Post, {
  foreignKey: 'id_user',
});
module.exports = { User, Post, Photo, Like_Post };

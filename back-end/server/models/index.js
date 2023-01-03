const Post = require("./post.js");
const Photo = require("./photo.js");
const Like_Post = require("./like_post");
const User = require("./user");
const Comment = require("./comment");
const Follow = require("./follow");
const Like_Comment = require("./like_comment.js");

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

// Quan hệ Like_Post 
Post.hasMany(Like_Post, {
  foreignKey: "id_post",
});

Like_Post.belongsTo(Post, {
  foreignKey: "id_post",
});

Like_Post.belongsTo(User, {
  foreignKey: "id_user",
});

User.hasMany(Like_Post, {
  foreignKey: "id_user",
});

// NN
// User.belongsToMany(Post, {
//   through: Like_Post,
//   foreignKey: "id_user",
// });
// Post.belongsToMany(User, {
//   through: Like_Post,
//   foreignKey: "id_post",
// });

//Quan hệ bình luận
Post.hasMany(Comment, {
  foreignKey: "id_post",
});

Comment.belongsTo(Post, {
  foreignKey: "id_post",
});

Comment.belongsTo(User, {
  foreignKey: "id_user",
});

User.hasMany(Comment, {
  foreignKey: "id_user",
});

//Quan hệ like bình luận
Comment.hasMany(Like_Comment, {
  foreignKey: "id_com",
});

Like_Comment.belongsTo(Comment, {
  foreignKey: "id_com",
});

Like_Comment.belongsTo(User, {
  foreignKey: "id_user",
});

User.hasMany(Like_Comment, {
  foreignKey: "id_user",
});

//NN
// User.belongsToMany(Comment, {
//   through: Like_Comment,
//   foreignKey: "id_user",
// });
// Comment.belongsToMany(User, {
//   through: Like_Comment,
//   foreignKey: "id_com",
// });
// Follower.belongsTo(User, {
//   foreignKey: 'follower_id',
// });

User.hasMany(Follow, {
  as: "followee",
  foreignKey: "id_follower",
});
User.hasMany(Follow, {
  as: "follower",
  foreignKey: "id_followee",
});


Follow.belongsTo(User, {
  as: "follower",
  foreignKey: "id_follower",
});
Follow.belongsTo(User, {
  as: "followee",
  foreignKey: "id_followee",
});

module.exports = {
  User,
  Post,
  Photo,
  Like_Post,
  Comment,
  Follow,
  Like_Comment,
};

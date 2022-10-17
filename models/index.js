// Code referenced from Module 14 - Mini Project

// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A User can have many Posts
// Create a foreign key in the post table
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// A User can have many Comments
// Create a foreign key in the comment table
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// A Post belongs to a single User
// Create a foreign key in the post table
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// A Post can have many Comments
// Create a foreign key in the comment table
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// A Comment belongs to a single User
// Create a foreign key in the comment table
Comment.belongsTo(User, {
  foreignKey: 'userId',
});

// A Comment belongs to a single Post
// Create a foreign key in the comment table
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = { User, Post, Comment };

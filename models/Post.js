// Code referenced from Module 14 - Mini Project

// import sequelize classes
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for posts
class Post extends Model {}

Post.init(
  {
    // Define fields/columns on model
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // converts camelCase to under_score (eg: columnId > column_id)
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;

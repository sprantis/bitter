// Code referenced from Module 14 - Mini Project

// import sequelize classes
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Create a new Sequelize model for users
class User extends Model {
  checkPassword(signinPw) {
    return bcrypt.compareSync(signinPw, this.password);
  }
}

User.init(
  {
    // Define fields/columns on model
    // Manually define the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    pfpURL: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    hooks: {
      // Use the beforeCreate hook to hash the user's password before a new instance is created
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Use the beforeUpdate hook to hash the user's password before an instance is updated
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    // converts camelCase to under_score (eg: columnId > column_id)
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

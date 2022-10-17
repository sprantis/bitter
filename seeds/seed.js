// Code referenced from Module 14 - Mini Project

// import connection module and models
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// import seed data
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
    // Connect to the database 
    await sequelize.sync({ force: true });

    // Bulk create multiplw rows using the userData array
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    // Bulk create multiplw rows using the postData array
    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true
    });

    // Bulk create multiplw rows using the postData array
    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedDatabase();

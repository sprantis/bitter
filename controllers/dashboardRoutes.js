// Code referenced from Module 14 - Mini Project

// import express router, related models, and auth modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

// GET all posts (using auth to validate a logged in session)
router.get('/', auth, async (req, res) => {
    try {
        // Get all posts from the post table
        const postData = await Post.findAll({
            where: { userId: req.session.currUserId },
            // perform a JOIN to include all associated Users and Comments
            include: [
                { 
                    model: User,
                    attributes: ['username'] 
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated']
                }
            ]
        });

        // Iterate over the data and serialize it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass the serialized data and session flag into the template, then render the template
        res.render('dashboard', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET newPost in dashboard (using auth middleware to prevent access to route)
router.get('/newPost', auth, async (req, res) => {
    try {
        // render the newPost template at this path
        res.render('newPost');
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET updatePost in dashboard (Use auth middleware to prevent access to route)
router.get('/updatePost/:id', auth, async (req, res) => {
    try {
        // Get the post where the id matches
        const postData = await Post.findOne({
            where: { id: req.params.id },
            // perform a JOIN to include all associated Users and Comments
            include: [
                { model: User },
                {
                    model: Comment,
                    include: { model: User }
                }
            ]
        });

        // if the post does not have a valid id, error out with a 404 status
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        // Iterate over the data and serialize it
        const post = postData.get({ plain: true});
        
        // Pass the serialized data and session flag into the template, then render the template
        res.render('updatePost', { 
            post, 
            loggedIn: req.session.loggedIn 
        });
    }
    catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET updateComment in dashboard (Use auth middleware to prevent access to route)
router.get('/updateComment/:id', auth, async (req, res) => {
    try {
        // Get the comment where the id matches
        const commentData = await Comment.findOne({
            where: { id: req.params.id },
            // perform a JOIN to include all associated Users and Posts
            include: [
                { model: User },
                {
                    model: Post,
                    include: { model: User }
                }
            ]
        });

        // if the comment does not have a valid id, error out with a 404 status
        if (!commentData) {
            res.status(404).json({ message: 'There is no comment with this id' });
            return;
        }

        // Iterate over the data and serialize it
        const comment = commentData.get({ plain: true});

        // Pass the serialized data and session flag into the template, then render the template
        res.render('updateComment', { 
            comment, 
            loggedIn: req.session.loggedIn 
        });
    }
    catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

module.exports = router;
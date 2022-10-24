// Code referenced from Module 14 - Mini Project

// import express router, related models, and auth modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const auth = require('../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        // Get all posts
        const postData = await Post.findAll({
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
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn,
            currUserId: req.session.currUserId,
        });
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET signinAndSignup in homepage
router.get('/signin', async (req, res) => {
    try {
        // If the user is already logged in, redirect the request to the dashboard route
        if (req.session.loggedIn) {
            res.redirect('/dashboard');
            return;
        }

        // render the template
        res.render('signinAndSignup')
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET single post in homepage
router.get('/post/:id', async (req, res) => {
    try {
        // Get the post where the id matches
        const postData = await Post.findOne(
            {
                where: {
                    id: req.params.id
                },
                // fields to include in the returned data
                attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
                // perform a JOIN to include all associated Comments and Users
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        );

        // if the post does not have a valid id, error out with a 404 status
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id'});
            return;
        }

        // Iterate over the data and serialize it
        const post = postData.get({ plain: true });

        // Pass the serialized data, curresnt user ID and session flag into the template, then render the template
        res.render('post', {
            ...post,
            currUserId: req.session.currUserId,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET dashboard in homepage (Use auth middleware to prevent access to route)
router.get('/dashboard', auth, async (req, res) => {
    try {
      // Get the post where the primary key matches the current user ID
      const userData = await User.findByPk(req.session.currUserId, {
        // fields to include in the returned data
        attributes: { exclude: ['password'] },
        // perform a JOIN to include all associated Posts and Comments
        include: [
            { model: Post },
            { model: Comment}
        ],
      });
  
      // Iterate over the data and serialize it
      const user = userData.get({ plain: true });
  
      // Pass the serialized data and session flag into the template, then render the template
      res.render('dashboard', {
        ...user,
        loggedIn: true
      });
    } catch (err) {
    // return the error as JSON with a 500 ERROR status
      res.status(500).json(err);
    }
  });

module.exports = router;
// Code referenced from Module 14 - Mini Project

// import express router, related models, and auth modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require ('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        // Get all posts from the post table 
        const postData = await Post.findAll({
            // fields to include in the returned data
            attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
            // Order by dateCreated in descending order
            order: [['dateCreated', 'DESC']], 
            // perform a JOIN to include all associated Users and Comments
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        
        // return the data as JSON with a 200 OK status
        res.status(200).json(postData);
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET a single post
router.get('/:id', async (req, res) => {
    try {
        // Find a single post where the id matches the request
        const postData = await Post.findOne({
            where: { id: req.params.id },
            // fields to include in the returned data
            attributes: ['id', 'postTitle', 'postContent', 'dateCreated'],
            // perform a JOIN to include all associated Users and Comments
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'userId', 'postId', 'commentText', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ] 
        });

        // if the post does not have a valid id, error out with a 404 status
        if (!postData) {
            res.status(404).json({ message: 'There are no posts with this id'});
            return;
        }
        
        // return the data as JSON with a 200 OK status
        res.status(200).json(postData);
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// CREATE a post (using auth to validate a logged in session)
router.post('/', auth, async (req, res) => {
    // Grab userId from active session, postTitle, and postContent when adding a new post
    try {
        const postData = await Post.create({
            userId: req.session.currUserId,
            postTitle: req.body.postTitle,
            postContent: req.body.postContent
        });

        // return the new data as JSON with a 200 OK status
        res.status(200).json(postData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// UPDATE a post (using auth to validate a logged in session)
router.put('/:id', auth, async (req, res) => {
    try {
        // Update the comment with new postTitle and postContent where the id matches
        const postData = await Post.update(
            {
                postTitle: req.body.postTitle,
                postContent: req.body.postContent
            },
            { where: 
                { 
                    id: req.params.id,
                    userId: req.session.currUserId 
                } 
            }
        );

        // if the post does not have a valid id, error out with a 404 status
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        // return the updated data as JSON with a 200 OK status
        res.status(200).json(postData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(500).json(err);
    }
});

// DELETE a post (using auth to validate a logged in session)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Delete the data where the id matches
        const postData = await Post.destroy({
            where: { 
                id: req.params.id,
                userId: req.session.currUserId 
            }
        });

        // if the post does not have a valid id, error out with a 404 status
        if (!postData) {
            res.status(404).json({ message: 'There is no post with this id' });
            return;
        }

        // return a 200 OK status
        res.status(200).json(postData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(500).json(err);
    }
});

module.exports = router;
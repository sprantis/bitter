// Code referenced from Module 14 - Mini Project

// import express router, related models, and auth modules
const router = require('express').Router();
const { User, Comment  } = require('../../models');
const auth = require ('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    try {
        // Get all comments from the comment table
        const commentData = await Comment.findAll({
            // fields to include in the returned data
            attributes: ['id', 'commentText', 'dateCreated'],
            // perform a JOIN to include all associated Users
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        // return the data as JSON with a 200 OK status
        res.status(200).json(commentData);
    } catch (err) {
        // return the error as JSON with a 500 ERROR status
        res.status(500).json(err);
    }
});

// GET a single comment
router.get('/:id', async (req, res) => {
    try {
        // Find a single comment where the id matches the request
        const commentData = await Comment.findOne({ where: { id: req.params.id } });

        // return the data as JSON with a 200 OK status
        res.status(200).json(commentData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// CREATE a comment (using auth to validate a logged in session)
router.post('/', auth, async (req, res) => {
    // Grab userId from active session, the postId, and the commentText when posting a new comment
    try {
        const commentData = await Comment.create({
            userId: req.session.currUserId,
            postId: req.body.postId,
            commentText: req.body.commentText
        });

        // return the new data as JSON with a 200 OK status
        res.status(200).json(commentData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// UPDATE a comment (using auth to validate a logged in session)
router.put('/:id', auth, async (req, res) => {
    try {
        // Update the comment with new commentText where the id matches
        const commentData = await Comment.update(
            { commentText: req.body.commentText },
            { where: { id: req.params.id } }
        );

        // if the comment does not have a valid id, error out with a 404 status
        if (!commentData) {
        res.status(404).json({ message: 'There is no comment with this id' });
        return;
        }

        // return the updated data as JSON with a 200 OK status
        res.status(200).json(commentData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// DELETE a comment (using auth to validate a logged in session)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Delete the data where the id matches
        const commentData = await Comment.destroy({ where: { id: req.params.id } });

        // if the comment does not have a valid id, error out with a 404 status
        if (!commentData) {
            res.status(404).json({ message: 'There is no comment with this id' });
            return;
        }

        // return a 200 OK status
        res.status(200).json(commentData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

module.exports = router;
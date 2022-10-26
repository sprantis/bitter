// Code referenced from Module 14 - Mini Project

// import express router and related models
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        // Get all users from the users table
        const userData = await User.findAll({
            // fields to include in the returned data
            attributes: { exclude: ['password'] },
            // order returned data by ascending order
            order: [
                'username', 
                'ASC'
                // 'pfpURL'
            ] 
        });

        // return the data as JSON with a 200 OK status
        res.status(200).json(userData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});


// GET a single user
router.get('/:id', async (req, res) => {
    try {
        // Find a single user where the id matches the request
        const userData = await User.findOne({
            // fields to exclude from the returned data
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            // perform a JOIN to include all associated Posts and Comments
            include: [
                {
                    model: Post,
                    attributes: ['id', 'postTitle', 'postContent', 'dateCreated']
                },
                {
                    model: Comment,
                    attributes: ['id', 'commentText', 'dateCreated'],
                    include: {
                        model: Post,
                        attributes: ['postTitle']
                    }
                }
            ]
        });
        // return the data as JSON with a 200 OK status
        res.status(200).json(userData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// CREATE a user
router.post('/', async (req, res) => {
    try {
        // Grab username and password from the requestwhen creating a new user
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        // Save the information from the request into a session, and include a current user ID and a logged in indicator or true
        req.session.save(() => {
            req.session.currUserId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            // return the new data as JSON with a 200 OK status
            res.status(200).json(userData);
        });
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// SIGN IN a user
router.post('/signin', async (req, res) => {
    try {
        // Find a user based on the username in the request
        const userData = await User.findOne({ where: { username: req.body.username } });

        // If there is no valid user, return an error as JSON
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        // If the user object does not have a valid password, return an error as JSON
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Save the information from the request into a session, and include a current user ID and a logged in indicator or true
        req.session.save(() => {
            req.session.currUserId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            
            // return the new data as JSON with a 200 OK status
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// LOGOUT a user
router.post('/logout', (req, res) => {
    // If session is logged in, end the session by destroying it.
    if (req.session.loggedIn) {
        req.session.destroy(() => { res.status(204).end(); });
    } else {
        // end the session with a 404 status
        res.status(404).end();
    }
});

// UPDATE a user -- NOT USED --
router.put('/:id', async (req, res) => {
    try {
        // Update the user where the id matches (no current attribute to update)
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: { id: req.params.id }
        });

        // if the user does not have a valid id, error out with a 404 status
        if (!userData[0]) {
            res.status(404).json({ message: 'There is no user with this id' });
            return;
        }

        // return the updated data as JSON with a 200 OK status
        res.status(200).json(userData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        // Delete the data where the id matches
        const userData = await User.destroy({ where: { id: req.params.id } });

        // if the user does not have a valid id, error out with a 404 status
        if (!userData) {
            res.status(404).json({ message: 'There is no user with this id' });
            return;
        }

        // return a 200 OK status
        res.status(200).json(userData);
    } catch (err) {
        // return the error as JSON with a 400 ERROR status
        res.status(400).json(err);
    }
});




module.exports = router;
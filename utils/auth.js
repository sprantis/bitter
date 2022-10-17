// Code referenced from Module 14 - Mini Project

const auth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the signin route
    if (!req.session.loggedIn) {
        res.redirect('/signin');
    } else {
        next();
    }
};

module.exports = auth;

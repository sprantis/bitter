// Code referenced from Module 14 - Mini Project

const router = require('express').Router();

// import the express router, api, and client routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Prefix each route with its own path name that reflects the type of data it handles
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
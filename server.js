// Code referenced from Module 14 - Mini Project

// Notes: 
// Users are generated asyncronously from the seed, so username1 does mean association to userid1

// import modules to setup server, as well as controller routes and helper functions
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize our app variable by setting it to the value of express()
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up sessions
// maxAge of 5 minutes - commented out for now
const sess = {
    secret: 'Bitter Secret',
    cookie: {
        // maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
// Get access to session variable from handlebars templates: https://stackoverflow.com/questions/44883228/how-to-get-the-express-session-variable-in-all-the-handlebars-pages-right-now-i
// works but is unusable right now
// app.use(function (req, res, next) {
//     res.locals.session = req.session;
//     next();
// })


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Connect to the database before starting the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

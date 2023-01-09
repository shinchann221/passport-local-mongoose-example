//Import Packages
const express = require('express');
const router = require('./route/router');
const protected = require('./route/protected');
const passport = require('passport');
const User = require('./model/user');
const session = require('express-session');
const db = require('./__init__/initDB.js');

//init DB
db.connect();


//Express Server Config
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//Session
app.use(session({
    name: 'session-id',
    secret: "abcd1234", //Change Session Key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


//Initialize Passport and Authentication
app.use(passport.initialize());
app.use(passport.session());

//Create Passport-Local-Mongoose Strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   


//Auth Routes
app.use('/auth', router);

//Middleware to verify JWT
require('./passportConfig')(passport);
app.use(passport.authenticate("jwt", { session: false }));

//Protected Routes
app.use('/protected',protected);


var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
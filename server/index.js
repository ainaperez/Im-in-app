// Global imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
var bodyParser = require('body-parser') // why var rather than ES6 const / let?
const app = express();
// Local imports
const router = require('./router');
//const {verifyToken} = require('./middleware/verifyToken');

// Middlewares
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(session({
//   key: 'user_sid',
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     expires: 10800000, // 3 hours
//     httpOnly: false
//   }
// }))
// app.use(passport.initialize());

// app.use(passport.session());

// Routes
app.use(router);

// Exporting app
// Exporting & listening to port in start.js for tests to work
module.exports = app;

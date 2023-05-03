const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'imin';
const DB_TEST_PORT = process.env.DB_TEST_PORT || 27018;
const DB_TEST_NAME = process.env.DB_TEST_NAME || 'imin-testing';
const DB_DEV_URL = process.env.DB_DEV_URL || `mongodb://localhost:${DB_PORT}/${DB_NAME}`; // added by Ali
const DB_TEST_URL = process.env.DB_TEST_URL || `mongodb://localhost:${DB_TEST_PORT}/${DB_TEST_NAME}`;
const DB_URL = process.env.NODE_ENV === 'TESTING' ? DB_TEST_URL : DB_DEV_URL;


mongoose
  .connect( DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`🦆 Database (sessions) connected @ URL ${DB_URL}!`))
  .catch((error) => console.log(`😞 Sorry, something went wrong! ${error}`));

  
module.exports = mongoose;

// Set up testing database here
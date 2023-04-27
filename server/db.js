const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'imin';
const DB_URL = process.env.DB_URL || `mongodb://localhost:${DB_PORT}/${DB_NAME}`; // added by Ali

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`🦆 Database (sessions) connected @ URL ${DB_URL}!`))
  .catch((error) => console.log(`😞 Sorry, something went wrong! ${error}`));

module.exports = mongoose;
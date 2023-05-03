// Global imports
require('dotenv').config();

// Local imports
const SERVER_PORT = process.env.PORT;
const app = require("./index.js");

// Main
app.listen(SERVER_PORT, (error) => {
  if (error) {
    console.log(`😞 Sorry, something went wrong! ${error}`); // eslint-disable-line no-console
  } else {
    console.log(`🚀 Server (sessions) is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
  }
});
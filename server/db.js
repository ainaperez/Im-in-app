const mongoose = require('mongoose');
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_PORT,
  DB_NAME
} = process.env;

const options = {
  // useNewUrlParser: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 500,
  // connectTimeoutMS: 10000,
};

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}?authSource=admin`
console.log(url)

try{
  mongoose.connect(
    url, options
  )
  console.log(`🦆 Database (sessions) connected @ port ${DB_PORT}!`);
}catch(err){
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🦆 Database (sessions) connected @ port ${DB_PORT}!`);
  }
}


module.exports = mongoose;
const mongoose = require('mongoose');



const dbUrl = process.env.DB_URI


async function dbConnect() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database Connected Sucessfully!');
  } catch (error) {
    console.log('Error occured in db!', error);
  }
}

module.exports = { dbConnect };
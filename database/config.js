const mongoose = require('mongoose');

const dbConnection = async() => {

  try {

    await mongoose.connect( process.env.MONGO_CONNECT );
    console.log('database online');

  } catch (error) {
    console.log(error);
    throw new Error('Execute database failed')
  }

}

module.exports = {
  dbConnection
}
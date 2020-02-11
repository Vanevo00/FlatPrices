const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      //to avoid console warnings
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log('flat_prices mongoDB connected')
  }
  catch(error) {
    console.log("error:", error)
    process.exit(1); //exit with failure
  }
}

module.exports = connectDB

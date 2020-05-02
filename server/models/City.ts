const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  mainImageLink: {
    type: String
  },
  popularity: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('city', CitySchema)

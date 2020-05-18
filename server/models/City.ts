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
  },
  srealityScraper: {
    type: String
  },
  nextRealityScraper: {
    type: String
  },
  remaxScraper: {
    type: String
  },
  svobodaWilliamsScraper: {
    type: String
  },
  realityMatScraper: {
    type: String
  },
  idnesScraper: {
    type: String
  },
  rentScraper: {
    type: String
  }
})

module.exports = mongoose.model('city', CitySchema)

export {} // avoiding TS redeclaration error
const mongoose = require('mongoose')

const RentSchema = mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  squareMeters: {
    type: Number,
    required: true
  },
  rentCZK: {
    type: Number,
    required: true
  },
  rentPerMeter: {
    type: Number,
    required: true
  },
  link: {
    type: String
  },
  neighbourhoodNumber: {
    type: String
  },
  rooms: {
    type: String,
    required: true
  },
  neighbourhood: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'neighbourhood',
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'city',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('rent', RentSchema)

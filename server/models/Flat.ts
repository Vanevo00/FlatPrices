export {} // avoiding TS redeclaration error
const mongoose = require('mongoose')

const FlatSchema = mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  squareMeters: {
    type: Number,
    required: true
  },
  priceCZK: {
    type: Number,
    required: true
  },
  pricePerMeter: {
    type: Number,
    required: true
  },
  link: {
    type: String
  },
  floor: {
    type: Number
  },
  lift: {
    type: Boolean
  },
  contacted: {
    type: Boolean,
    default: false
  },
  visited: {
    type: Boolean,
    default: false
  },
  agency: {
    type: String
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

module.exports = mongoose.model('flat', FlatSchema)

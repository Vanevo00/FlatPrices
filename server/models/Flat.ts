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
  mainImage: {
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
  neighbourhoodNumber: {
    type: String
  },
  rooms: {
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
  addedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('flat', FlatSchema)

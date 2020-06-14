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
    type: Date
  },
  agency: {
    type: String
  },
  contact: {
    type: String
  },
  reasonForSelling: {
    type: String
  },
  houseOwnershipStructure: {
    type: String
  },
  ownershipStructure: {
    type: String
  },
  lastSale: {
    type: Date
  },
  ownershipType: {
    type: String
  },
  monthlyExpensesAssociation: {
    type: Number
  },
  monthlyExpensesOther: {
    type: Number
  },
  reconstructed: {
    type: Date
  },
  houseReconstructed: {
    type: Date
  },
  parking: {
    type: Boolean
  },
  balcony: {
    type: Boolean
  },
  garden: {
    type: Boolean
  },
  heating: {
    type: String
  },
  publicTransport: {
    type: String
  },
  mortgaged: {
    type: Boolean
  },
  cadastralInfo: {
    type: String
  },
  notes: {
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

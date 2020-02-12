export {} // avoiding TS redeclaration error
const mongoose = require('mongoose')

const NeighbourhoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'cities',
    required: true
  }
})

module.exports = mongoose.model('neighbourhood', NeighbourhoodSchema)

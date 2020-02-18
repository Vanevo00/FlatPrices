import express, { Request, Response } from 'express'
const router = express.Router()

const Neighbourhood = require('../models/Neighbourhood')
const City = require('../models/City')
const Flat = require('../models/Flat')

router.get('/all/:name', async (req: Request, res: Response) => {
  try {
    let [neighbourhoodsByName, citiesByName, flatsByAddress] = await Promise.all([
      Neighbourhood.find({ name: new RegExp(req.params.name, 'i') }),
      City.find({ 'name': new RegExp(req.params.name, 'i') }),
      Flat.find({ 'address': new RegExp(req.params.name, 'i') })
    ])

    res.json([{
      'neighbourhoods': neighbourhoodsByName,
      'cities': citiesByName,
      'flats': flatsByAddress
    }])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router

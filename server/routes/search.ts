import express, { Request, Response } from 'express'
const router = express.Router()

const Neighbourhood = require('../models/Neighbourhood')
const City = require('../models/City')
const Flat = require('../models/Flat')

router.get('/all/:name/:limit?', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.params.limit) || 100
    const [neighbourhoodsByName, citiesByName, flatsByAddress] = await Promise.all([
      Neighbourhood.find({ name: new RegExp(req.params.name, 'i') }).populate('city').limit(limit),
      City.find({ name: new RegExp(req.params.name, 'i') }).limit(limit),
      Flat.find({ address: new RegExp(req.params.name, 'i') }).populate('city').populate('neighbourhood').sort('-createdAt').limit(limit)
    ])

    res.json({
      neighbourhoods: neighbourhoodsByName,
      cities: citiesByName,
      flats: flatsByAddress
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router

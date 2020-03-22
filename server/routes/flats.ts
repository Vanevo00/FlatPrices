import express, { Request, Response } from 'express'
import { Flat } from '../../Types/Flat'

const { check, validationResult } = require('express-validator')
const router = express.Router()

const Flat = require('../models/Flat')
const Neighbourhood = require('../models/Neighbourhood')
const sortHighestToLowest = require('../utils/sortHighestToLowest')

// @route  GET api/flats
// @desc   Get all flats
router.get('/', async (req: Request, res: Response) => {
  try {
    const allFlats = await Flat.find({})
    res.json(allFlats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/new/:limit
// @desc   Get newest flats
router.get('/new/:limit?', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.params.limit) || 10
    const newFlats = await Flat
      .find({})
      .populate('city')
      .populate('neighbourhood')
      .sort('-createdAt')
      .limit(limit)
    res.json(newFlats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/search/:_id
// @desc   Get one flat by id
router.get('/search/:_id', async (req: Request, res: Response) => {
  try {
    const flat = await Flat.findById(req.params._id)
    res.json(flat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST api/flats/searchByParameters
// @desc   Get one flat by address, squareMeters, priceCZK and agency
router.post('/searchByParameters', async (req: Request, res: Response) => {
  try {
    const {
      address,
      squareMeters,
      priceCZK,
      agency
    } = req.body

    const flat = await Flat.find({
      address,
      squareMeters,
      priceCZK,
      agency
    })
    res.json(flat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/byCity/:_id
// @desc   Get flats by city
router.get('/byCity/:_id', async (req: Request, res: Response) => {
  try {
    const flatsByCity = await Flat.find({ city: req.params._id }).populate('neighbourhood').sort('-createdAt')
    res.json(flatsByCity)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/byNeighbourhood/:_id
// @desc   Get flats by neighbourhood
router.get('/byNeighbourhood/:_id', async (req: Request, res: Response) => {
  try {
    const flatsByNeighbourhood = await Flat.find({ neighbourhood: req.params._id }).sort('-createdAt')
    res.json(flatsByNeighbourhood)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/byAddress/:address
// @desc   Search flats by address
router.get('/byAddress/:address', async (req: Request, res: Response) => {
  try {
    const flatsByAddress = await Flat.find({ address: new RegExp(req.params.address, 'i') })
    res.json(flatsByAddress)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/avgPriceNeighbourhood/:_id
// @desc   Get average and median flat price per meter by neighbourhood, median below and above 60m2
router.get('/avgPriceNeighbourhood/:_id', async (req: Request, res: Response) => {
  try {
    const flatsByNeighbourhood = await Flat.find({ neighbourhood: req.params._id })
    let flatPrices: number[] = []
    flatsByNeighbourhood.map((flat: Flat) => {
      flatPrices.push(flat.pricePerMeter)
    })
    flatPrices = sortHighestToLowest(flatPrices)

    const medianPrice = flatPrices[Math.ceil(flatPrices.length / 2) - 1]
    const avgPrice = parseInt((flatPrices.reduce((a, b) => a + b, 0) / flatPrices.length).toFixed(2))

    const medianFlatsBySize = () => {
      const smallFlats = flatsByNeighbourhood.filter((flat: Flat) => flat.squareMeters <= 60)
      const largeFlats = flatsByNeighbourhood.filter((flat: Flat) => flat.squareMeters > 60)

      let smallFlatPrices: number[] = []
      let largeFlatPrices: number[] = []
      smallFlats.map((smallFlat: Flat) => {
        smallFlatPrices.push(smallFlat.pricePerMeter)
      })
      largeFlats.map((largeFlat: Flat) => {
        largeFlatPrices.push(largeFlat.pricePerMeter)
      })
      smallFlatPrices = sortHighestToLowest(smallFlatPrices)
      largeFlatPrices = sortHighestToLowest(largeFlatPrices)

      return {
        smallFlatPricesMedian: smallFlatPrices[Math.ceil(smallFlatPrices.length / 2) - 1],
        largeFlatPricesMedian: largeFlatPrices[Math.ceil(largeFlatPrices.length / 2) - 1],
        smallFlatPrices,
        largeFlatPrices,
        flatPrices
      }
    }

    res.json({
      avgPrice,
      medianPrice,
      ...medianFlatsBySize()
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/avgPriceCity/:_id
// @desc   Get average and median flat price per meter by neighbourhood, median below and above 60m2
router.get('/avgPriceCity/:_id', async (req: Request, res: Response) => {
  try {
    const flatsByCity = await Flat.find({ city: req.params._id })
    let flatPrices: number[] = []
    flatsByCity.map((flat: Flat) => {
      flatPrices.push(flat.pricePerMeter)
    })
    flatPrices = sortHighestToLowest(flatPrices)

    const medianPrice = flatPrices[Math.ceil(flatPrices.length / 2) - 1]
    const avgPrice = parseInt((flatPrices.reduce((a, b) => a + b, 0) / flatPrices.length).toFixed(2))

    const medianFlatsBySize = () => {
      const smallFlats = flatsByCity.filter((flat: Flat) => flat.squareMeters <= 60)
      const largeFlats = flatsByCity.filter((flat: Flat) => flat.squareMeters > 60)

      let smallFlatPrices: number[] = []
      let largeFlatPrices: number[] = []
      smallFlats.map((smallFlat: Flat) => {
        smallFlatPrices.push(smallFlat.pricePerMeter)
      })
      largeFlats.map((largeFlat: Flat) => {
        largeFlatPrices.push(largeFlat.pricePerMeter)
      })
      smallFlatPrices = sortHighestToLowest(smallFlatPrices)
      largeFlatPrices = sortHighestToLowest(largeFlatPrices)

      return {
        smallFlatPricesMedian: smallFlatPrices[Math.ceil(smallFlatPrices.length / 2) - 1],
        largeFlatPricesMedian: largeFlatPrices[Math.ceil(largeFlatPrices.length / 2) - 1],
        smallFlatPrices,
        largeFlatPrices,
        flatPrices
      }
    }

    res.json({
      avgPrice,
      medianPrice,
      ...medianFlatsBySize()
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/flats
// @desc   Add new flat
router.post('/', [
  check('address', 'address is required').not().isEmpty(),
  check('squareMeters', 'square meters must be a positive number').isFloat({ min: 1.00 }),
  check('priceCZK', 'price must be a positive number').isFloat({ min: 1.00 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    address,
    squareMeters,
    priceCZK,
    mainImage,
    agency,
    link,
    floor,
    lift,
    contacted,
    visited,
    neighbourhood,
    addedBy,
    neighbourhoodNumber,
    rooms
  } = req.body

  const flatNeighbourhoood = await Neighbourhood.findOne({ _id: neighbourhood })

  const city = flatNeighbourhoood.city

  const pricePerMeter = (priceCZK / squareMeters).toFixed(2)

  try {
    const newFlat = new Flat({
      address,
      squareMeters,
      priceCZK,
      agency,
      mainImage,
      pricePerMeter,
      link,
      floor,
      lift,
      contacted,
      visited,
      neighbourhood,
      city,
      addedBy,
      neighbourhoodNumber,
      rooms
    })

    const flat = await newFlat.save()

    res.json(flat)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route PUT api/flats
// @desc Update Flat information
router.put('/:_id', async (req: any, res: Response) => {
  try {
    await Flat.findByIdAndUpdate(req.params._id, req.body)
    res.json(req.body)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  DELETE api/flats
// @desc   Delete Flat
router.delete('/:_id', async (req: Request, res: Response) => {
  try {
    await Flat.deleteOne({ _id: req.params._id })
    res.send('delete successful')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router

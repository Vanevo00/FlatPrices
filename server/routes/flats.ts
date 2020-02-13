import express, { Request, Response } from 'express'

const { check, validationResult } = require('express-validator')
const router = express.Router()

const Flat = require('../models/Flat')
const NeighBourhood = require('../models/Neighbourhood')

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

// @route  GET api/flats/:_id
// @desc   Get one flat by id
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const flat = await Flat.find({ _id: req.params._id })
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
    const flatsByCity = await Flat.find({ city: req.params._id })
    res.json(flatsByCity)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/flats/byNeighbourhood/:_id
// @desc   Get flats by city
router.get('/byNeighbourhood/:_id', async (req: Request, res: Response) => {
  try {
    const flatsByNeighbourhood = await Flat.find({ neighbourhood: req.params._id })
    res.json(flatsByNeighbourhood)
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
    link,
    floor,
    lift,
    contacted,
    visited,
    neighbourhood
  } = req.body

  const flatNeighbourhoood = await NeighBourhood.find({ _id: neighbourhood })

  const city = flatNeighbourhoood[0].city

  const pricePerMeter = (priceCZK / squareMeters).toFixed(2)

  try {
    const newFlat = new Flat({
      address,
      squareMeters,
      priceCZK,
      pricePerMeter,
      link,
      floor,
      lift,
      contacted,
      visited,
      neighbourhood,
      city
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

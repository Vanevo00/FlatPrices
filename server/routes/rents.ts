import express, { Request, Response } from 'express'
import { Rent } from '../../client/components/Types/Rent'

const { check, validationResult } = require('express-validator')

const router = express.Router()
const Neighbourhood = require('../models/Neighbourhood')
const sortHighestToLowest = require('../utils/sortHighestToLowest')
const getRentsAverageAndMedian = require('../utils/getRentsAverageAndMedian')

const Rent = require('../models/Rent')

// @route  GET api/rents
// @desc   Get all rents
router.get('/', async (req: Request, res: Response) => {
  try {
    const allRents = await Rent.find({})
    res.json(allRents)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/rents/avgRentCity/:_id
// @desc   Get average and median rent per meter, median rent per several small dispositions, filtered by city
router.get('/avgRentCity/:_id', async (req: Request, res: Response) => {
  try {
    const rentsByCity = await Rent.find({ city: req.params._id })
    let rentPrices: number[] = []
    rentsByCity.map((rent: Rent) => {
      rentPrices.push(rent.rentCZK)
    })
    rentPrices = sortHighestToLowest(rentPrices)

    const medianRent = rentPrices[Math.ceil(rentPrices.length / 2) - 1]
    const avgRent = parseInt((rentPrices.reduce((a, b) => a + b, 0) / rentPrices.length).toFixed(2))

    const medianFlatsByDispositions = () => {
      return {
        rents1kk: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '1+kk')),
        rents1plus1: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '1+1')),
        rents2kk: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '2+kk')),
        rents2plus1: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '2+1')),
        rents3kk: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '3+kk')),
        rents3plus1: getRentsAverageAndMedian(rentsByCity.filter((rent: Rent) => rent.rooms === '3+1')),
      }
    }

    res.json({
      rentPrices,
      avgRent,
      medianRent,
      ...medianFlatsByDispositions()
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/rents
// @desc   Add new rent
router.post('/', [
  check('address', 'address is required').not().isEmpty(),
  check('squareMeters', 'square meters must be a positive number').isFloat({ min: 1.00 }),
  check('rentCZK', 'price must be a positive number').isFloat({ min: 1.00 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    address,
    squareMeters,
    rentCZK,
    link,
    neighbourhood,
    neighbourhoodNumber,
    rooms
  } = req.body

  const rentNeighbourhoood = await Neighbourhood.findOne({ _id: neighbourhood })

  const city = rentNeighbourhoood.city

  const rentPerMeter = (rentCZK / squareMeters).toFixed(2)

  try {
    const newRent = new Rent({
      address,
      squareMeters,
      rentCZK,
      rentPerMeter,
      link,
      neighbourhood,
      city,
      neighbourhoodNumber,
      rooms
    })

    const rent = await newRent.save()

    res.json(rent)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

module.exports = router

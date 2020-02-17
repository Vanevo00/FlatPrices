import express, { Request, Response } from 'express'

const { check, validationResult } = require('express-validator')
const router = express.Router()

const City = require('../models/City')

// @route  GET api/cities
// @desc   Get all cities
router.get('/', async (req: Request, res: Response) => {
  try {
    const allCities = await City.find({})
    res.json(allCities)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/cities/byName/:name
// @desc   Search cities by name
router.get('/byName/:name', async (req: Request, res: Response) => {
  try {
    const citiesByName = await City.find({ 'name': new RegExp(req.params.name, 'i') })
    res.json(citiesByName)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/cities
// @desc   Add new city
router.post('/', [
  check('name', 'city name is required').not().isEmpty(),
  check('country', 'country name is required').not().isEmpty()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, country } = req.body

  try {
    const newCity = new City({
      name,
      country
    })

    const city = await newCity.save()

    res.json(city)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  DELETE api/citie
// @desc   Delete City
router.delete('/:_id', async (req: Request, res: Response) => {
  try {
    await City.deleteOne({ _id: req.params._id })
    res.send('delete successful')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router

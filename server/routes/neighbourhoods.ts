import express, { Request, Response } from 'express'

const { check, validationResult } = require('express-validator')
const router = express.Router()

const Neighbourhood = require('../models/Neighbourhood')

// @route  GET api/neighbourhoods
// @desc   Get all neighbourhoods
router.get('/', async (req: Request, res: Response) => {
  try {
    const allNeighbourhoods = await Neighbourhood.find({})
    res.json(allNeighbourhoods)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/neighbourhoods/:_id
// @desc   Get neighbourhood by id
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const neighbourhood = await Neighbourhood.find({ _id: req.params._id })
    res.json(neighbourhood)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/neighbourhoods/byCity/:_id
// @desc   Get all neighbourhoods in the city
router.get('/byCity/:_id', async (req: Request, res: Response) => {
  try {
    const neighbourhoodsByCity = await Neighbourhood.find({ city: req.params._id })
    res.json(neighbourhoodsByCity)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/neighbourhoods
// @desc   Add new neighbourhood
router.post('/', [
  check('name', 'city name is required').not().isEmpty(),
  check('city', 'city id is required').not().isEmpty()
], async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, city } = req.body

  try {
    const newNeighbourhood = new Neighbourhood({
      name,
      city
    })

    const neighbourhood = await newNeighbourhood.save()

    res.json(neighbourhood)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  DELETE api/neighbourhoods
// @desc   Delete neighbourhood
router.delete('/:_id', async (req: Request, res: Response) => {
  try {
    await Neighbourhood.deleteOne({ _id: req.params._id })
    res.send('delete successful')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

module.exports = router

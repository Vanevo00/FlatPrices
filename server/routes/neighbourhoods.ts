import express, { Request, Response } from 'express'

const { check, validationResult } = require('express-validator')
const router = express.Router()

const Neighbourhood = require('../models/Neighbourhood')

// @route  GET api/areas
// @desc   Get all areas
router.get('/', async (req: Request, res: Response) => {
  try {
    const allAreas = await Neighbourhood.find({})
    res.json(allAreas)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/areas
// @desc   Add new area
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
    const newArea = new Neighbourhood({
      name,
      city
    })

    const area = await newArea.save()

    res.json(area)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  DELETE api/areas
// @desc   Delete area
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

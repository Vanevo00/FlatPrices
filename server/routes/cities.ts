import express, { Request, Response } from 'express'

const { validationResult, check } = require('express-validator')
const router = express.Router()

const multer = require('multer')
const path = require('path')

const cityStorage = multer.diskStorage(
  {
    destination: 'client/public/city',
    filename: ( req, file, cb ) => {
      //get rid of diacritics, file extension, replace spaces with underscore
      const normalizedName = file.originalname.split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\.[^/.]+$/, '')
      cb(null, normalizedName + Date.now() + path.extname(file.originalname));
    }
  }
)

const cityUpload = multer({ storage: cityStorage })

const City = require('../models/City')


// @route  GET api/cities
// @desc   Get all cities
router.get('/', async (req: Request, res: Response) => {
  try {
    const allCities = await City.find({}).sort('-popularity')
    res.json(allCities)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/cities/:_id
// @desc   Get city by id
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const city = await City.findOne({ _id: req.params._id })
    res.json(city)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/cities/byName/:name
// @desc   Search cities by name
router.get('/byName/:name', async (req: Request, res: Response) => {
  try {
    const citiesByName = await City.find({ name: new RegExp(req.params.name, 'i') })
    res.json(citiesByName)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  GET api/cities/byExactName/:name
// @desc   Get city by exact name
router.get('/byExactName/:name', async (req: Request, res: Response) => {
  try {
    const cityByName = await City.findOne({ name: req.params.name })
    res.json(cityByName)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})

// @route  POST  api/cities
// @desc   Add new city
router.post('/', [
  cityUpload.single('image'),
  check('name', 'city name is required').not().isEmpty(),
  check('country', 'country name is required').not().isEmpty()
], async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    name,
    country,
    srealityScraper,
    nextRealityScraper,
    remaxScraper,
    svobodaWilliamsScraper,
    rentScraper,
    externalImageLink
  } = req.body

  let filename = ''
  if (req.file) {
    filename = `/city/${req.file.filename}`
  } else if (externalImageLink) {
    filename = externalImageLink
  }

  try {
    const newCity = new City({
      name,
      country,
      srealityScraper,
      nextRealityScraper,
      remaxScraper,
      svobodaWilliamsScraper,
      rentScraper,
      mainImageLink: filename
    })

    const city = await newCity.save()

    res.json(city)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route  POST  api/cities/edit/:_id
// @desc   Edit existing city
router.post('/edit/:_id', [
  cityUpload.single('image'),
  check('name', 'city name is required').not().isEmpty(),
  check('country', 'country name is required').not().isEmpty()
], async (req: any, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    name,
    country,
    srealityScraper,
    nextRealityScraper,
    remaxScraper,
    svobodaWilliamsScraper,
    rentScraper,
    externalImageLink
  } = req.body

  let filename = ''
  if (req.file) {
    filename = `/city/${req.file.filename}`
  } else if (externalImageLink) {
    filename = externalImageLink
  }

  try {
    const editedCity = await City.findOne({ _id: req.params._id })
    editedCity.name = name
    editedCity.country = country
    editedCity.srealityScraper = srealityScraper
    editedCity.rentScraper = rentScraper
    editedCity.mainImageLink = filename
    editedCity.nextRealityScraper = nextRealityScraper
    editedCity.remaxScraper = remaxScraper
    editedCity.svobodaWilliamsScraper = svobodaWilliamsScraper

    const city = await editedCity.save()

    res.json(city)
  } catch (err) {
    console.error(err)
    res.status(500).send('an error has occurred')
  }
})

// @route POST api/cities/increasePopularity/:_id
// @desc Increase popularity of a city by one
router.post('/increasePopularity/:_id', async (req: Request, res: Response) => {
  try {
    const clickedCity = await City.findOne({ _id: req.params._id })
    clickedCity.popularity = clickedCity.popularity + 1
    clickedCity.save()
    res.send('popularity increased')
  } catch (err) {
    console.log(err)
  }
})

// @route  DELETE api/cities
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

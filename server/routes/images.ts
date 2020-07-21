import express, { Response } from 'express'
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const axios = require ('axios')
const imageStorage = multer.memoryStorage()

const imageUpload = multer({ storage: imageStorage })

// @route  POST api/images
// @desc   upload and resize an image
router.post('/', [imageUpload.single('image')], async (req: any, res: Response) => {
  if (req.file) {
    //get rid of diacritics, file extension, replace spaces with underscore
    const normalizedName = req.file.originalname.split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\.[^/.]+$/, '') + Date.now()

    await sharp(req.file.buffer)
      .resize(640, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`build/server/public/images/${normalizedName}.jpg`)

    res.send(`${normalizedName}.jpg`)
  } else {
    res.send('file not present')
  }
})

// @route  POST api/images/external/:link
// @desc   Download image from external link and save it resized
router.post('/external', async (req: any, res: Response) => {
  try {
    const imageLinkSplit = req.body.link.split('/')
    const imageNameSplit = imageLinkSplit[imageLinkSplit.length - 1].split('.')
    const imageNameWithTimestamp = `${imageNameSplit[0]}${Date.now()}.jpg`
    const imagePath = `build/server/public/images/${imageNameWithTimestamp}`
    const file = await axios.get(req.body.link, {
      responseType: 'arraybuffer'
    })

    await sharp(file.data)
      .resize(640, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(imagePath)

    res.send(imageNameWithTimestamp)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router

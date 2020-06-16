import express, { Request, Response } from 'express'

const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

// const imageStorage = multer.diskStorage(
//   {
//     destination: 'client/public/images',
//     filename: ( req, file, cb ) => {
      //get rid of diacritics, file extension, replace spaces with underscore
      // const normalizedName = file.originalname.split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\.[^/.]+$/, '')
      // cb(null, normalizedName + Date.now() + path.extname(file.originalname));
//     }
//   }
// )
var imageStorage = multer.memoryStorage()

const imageUpload = multer({ storage: imageStorage })

router.post('/', [imageUpload.single('image')], async (req: any, res: Response) => {
  if (req.file) {
    //get rid of diacritics, file extension, replace spaces with underscore
    const normalizedName = req.file.originalname.split(' ').join('_').normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/\.[^/.]+$/, '') + Date.now()

    await sharp(req.file.buffer)
      .resize(640, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`client/public/images/${normalizedName}.jpg`);

    res.send(`/images/${normalizedName}.jpg`)
  } else {
    res.send('file not present')
  }
})

module.exports = router

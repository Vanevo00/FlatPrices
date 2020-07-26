const saveFlat = require('./saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')

const PAGE_BODY = 'https://www.bezrealitky.cz/nemovitosti-byty-domy/'

const bezrealitky = async () => {
  console.log('Scraping bezrealitky...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.bezrealitkyScraper) {
      console.log(`Scraping ${city.name}`)

      const getLinks = async () => {
        const { data } = await axios.post('https://www.bezrealitky.cz/api/record/markers', {
          "offerType": "prodej",
          "estateType": "byt",
          "locationInput": city.bezrealitkyScraper.locationInput,
          "boundary": city.bezrealitkyScraper.boundary
        })

        const links = []
        data.map((flat) => links.push(flat.uri))
        return links
      }

      for (const flatUrl of await getLinks()) {
        try {
          // skip commercials
          if (flatUrl.startsWith('https')) {
            continue
          }

          finalUrl =  `${PAGE_BODY}${flatUrl}`

          // find already scraped flat and skip it)
          const scrapedFlat = await axios.post(
            `${config.get('dbAddress')}/api/flats/byLink`,
            {link: finalUrl})

          if (scrapedFlat.data) {
            console.log(`skipping already scraped flat ${finalUrl}`)
            continue
          }

          const flat = {
            link: finalUrl,
            city: city.name,
            agency: 'bezrealitky'
          }

          const result = await axios.get(finalUrl)
          const $ = await cheerio.load(result.data)

          const address = $('.heading__perex').text().trim().split(',')[0]

          if (address.includes('Zobrazit na mapě')) {
            flat.address = 'unknown'
          } else {
            flat.address = address
          }

          flat.squareMeters = parseInt($('th:contains("Plocha:")').next().text().trim().split(' ')[0])

          flat.priceCZK = parseInt($('th:contains("Cena:")').next().text().trim().split(' ')[0].split('.').join(''))

          const neighbourhood = $('th:contains("Městská část:")').next().text().trim()
          if (neighbourhood) {
            flat.neighbourhood = neighbourhood.substr(0,neighbourhood.length/3)
          } else {
            flat.neighbourhood = 'unknown'
          }

          const rooms = $('th:contains("Dispozice:")').next().text().trim().split(' ')[0]
          flat.rooms = rooms.substr(0, rooms.length/3)

          const mainImage = $('a.carousel__item.b-gallery__img-lg__item').attr('href')
          if (mainImage.includes('.jpg') || mainImage.includes('.png')) {
            flat.mainImage = mainImage
          }

          const floor = parseInt($('th:contains("Podlaží:")').next().text().trim().split(' ')[0])
          if (floor) {
            flat.floor = floor
          }

          const lift = $('th:contains("Výtah:")').next().text().trim().split(' ')[0]
          if (lift === 'Ano') {
            flat.lift = true
          } else if (lift === 'Ne') {
            flat.lift = false
          }

          saveFlat.saveFlat(flat)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}

module.exports = bezrealitky

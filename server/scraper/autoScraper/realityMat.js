const saveFlat = require('../saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')

const realityMat = async () => {
  console.log('Scraping Realitymat...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.realityMatScraper) {
      console.log(`Scraping ${city.name}`)

      const getPages = async () => {
        const fetchedPage = await axios.get(city.realityMatScraper)
        const $ = await cheerio.load(fetchedPage.data)
        let foundNumberOfFlats = ($('.text-right.text-muted.mb-2').text().split('z ')[1].split(' ')[0]).replace(/\s/g,'')
        let numberOfPages = Math.ceil(parseInt(foundNumberOfFlats) / 10)
        console.log(`${numberOfPages} pages successfully loaded, getting links..`)
        return numberOfPages
      }

      const getLinks = async () => {
        const links = []
        const lastPage = await getPages()
        for (let i = 1; i <= lastPage; i++) {
          const fetchedPage = await axios.get(`${city.realityMatScraper}&page=${i}`)
          const $ = await cheerio.load(fetchedPage.data)
          $('a.stretched-link').each((i, el) => {
            links.push(`https://www.realitymat.cz${el.attribs.href}`)
          })
        }
        console.log(`${links.length} links successfully loaded, getting flat information..`)
        return links
      }

      for (const flatUrl of await getLinks()) {
        try {
          //find already scraped flat and skip it
          const scrapedFlat = await axios.post(
            `${config.get('dbAddress')}/api/flats/byLink`,
            {link: flatUrl})

          if (scrapedFlat.data) {
            console.log(`skipping already scraped flat ${flatUrl}`)
            continue
          }

          const flat = {
            link: flatUrl,
            city: city.name
          }

          const result = await axios.get(flatUrl)
          const $ = await cheerio.load(result.data)

          flat.agency = $('.col-md.order-md-last .h5 a').text().trim()
          //searching for weird Remax names and thus eliminating duplicit flats from Sreality and Remax websites
          if (/re\/?max/gi.test(flat.agency)) {
            flat.agency = 'Remax'
          }

          const locationInfo = $('.col.font-weight-bolder:contains("Adresa")').next().text().split(',')

          flat.address = locationInfo[0]

          // neighbourhood name in many different formats, (e.g. Ladova, Ústí nad Labem, Severní Terasa or Na Kohoutě, Ústí nad Labem - Bukov). In some cases there is no street address (Ústí nad Labem - Mojžíř) or neighbourhood.
          if (locationInfo.length === 1) {
            const splitLocation = locationInfo[0].split('-')
            flat.address = 'unknown'
            if (splitLocation.length > 1) {
              flat.neighbourhood = splitLocation[1].trim()
            } else {
              flat.neighbourhood = 'unknown'
            }
          } else if (locationInfo.length === 3) {
            flat.neighbourhood = locationInfo[2].trim()
          } else {
            const splitLocation = locationInfo[1].split('-')
            if (splitLocation.length > 1) {
              flat.neighbourhood = splitLocation[1].trim()
            } else {
              flat.neighbourhood = locationInfo[1].trim()
            }
          }
          //eliminate still incorrect scrapes of neighbourhood
          if (city.name === flat.neighbourhood) {
            flat.neighbourhood = 'unknown'
          }

          const size = parseInt($('.col.font-weight-bolder:contains("Plocha užitná")').next().text().split(' '))
          if (!size) {
            console.log('skipping flat, no size info')
            continue
          } else {
            flat.squareMeters = size
          }

          const price = parseInt($('.col.font-weight-bolder:contains("Cena")').next().text().split(' ')[0].replace(/\s/g,'').replace('Kč', ''))
          if (!price) {
            console.log('skipping flat, no price info')
            continue
          } else {
            flat.priceCZK = price
          }

          const roomInfoHeading = $('.col-lg-9 h1').text().trim().split(',')[0].split(' ')
          if (roomInfoHeading[1] === 'atypického') {
            flat.rooms = 'atypický'
          } else {
            flat.rooms = roomInfoHeading[2]
          }

          saveFlat.saveFlat(flat)
        } catch(err) {
          console.error(err)
        }
      }
    }
  }
  console.log(`realityMat scraping session finished at ${new Date()}`)
}

module.exports = realityMat

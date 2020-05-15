const saveFlat = require('../saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')

const nextReality = async() => {
  console.log('Scraping Next reality...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.nextRealityScraper) {
      console.log(`Scraping ${city.name}`)

      const result = await axios.get(city.nextRealityScraper)
      const $ = await cheerio.load(result.data)

      const getPages = () => {
        const pages = [city.nextRealityScraper]
        $('.pagination a').each((i, el) => {
          const href = `https://www.nextreality.cz${$(el).attr('href').trim()}`
          pages.push(href)
        })
        if (pages.length > 1) { // if there was pagination
          pages.pop() // get rid of the last href - the arrow
          pages.shift() // get rid of first - duplicit - page
        }
        console.log(`${pages.length} pages successfully loaded, getting links..`)
        return pages
      }

      const getLinks = async () => {
        const links = []
        for (const page of getPages()) {
          const fetchedPage = await axios.get(page)
          const $ = await cheerio.load(fetchedPage.data)
          $('.text-right a').each((i, el) => {
            const href = `https://www.nextreality.cz${$(el).attr('href').trim()}`
            links.push(href)
          })
        }
        console.log(`${links.length} links successfully loaded, getting flat information..`)
        return links
      }

      for (const flatUrl of await getLinks()) {
        //find already scraped flat and skip it
        const scrapedFlat = await axios.post(
          `${config.get('dbAddress')}/api/flats/byLink`,
          {link: flatUrl})

        if (scrapedFlat.data) {
          console.log(`skipping already scraped flat ${flatUrl}`)
          continue
        }

        const flat = {
          agency: 'Next Reality',
          link: flatUrl,
          city: city.name
        }
        const result = await axios.get(flatUrl)
        const $ = await cheerio.load(result.data)

        const location = $('.info > div:contains("Adresa:") > .col-xs-7').text()
        let address
        let neighbourhoodNumber
        if (city.name === 'Praha') { // Praha shows address and neighbourhood number on different position than other cities
          address = location.split(',')[0]
          neighbourhoodNumber = location.split(',')[2].trim()
        } else {
          address = location.split(',')[2]
          neighbourhoodNumber = location.split(',')[0].trim()
        }

        flat.neighbourhood = location.split(',')[1].trim()
        flat.address = address
        flat.neighbourhoodNumber = neighbourhoodNumber

        const size = $('.info div:contains("Užitná plocha") > .col-xs-7').text()
        flat.squareMeters = parseInt(size.split(' ')[0])

        const price = $('.info div:contains("Cena:") > .col-xs-7').text()
        flat.priceCZK = parseInt(price.split(',')[0].split(' ').join(''))

        flat.rooms = $('.info div:contains("Dispozice") > .col-xs-7').text()

        flat.pricePerMeter = parseFloat((flat.priceCZK / flat.squareMeters).toFixed(2))

        flat.mainImage = $('.main img').attr('src')

        saveFlat.saveFlat(flat)
      }
    }
  }
  console.log('Next Reality scraping session finished!')
}

module.exports = nextReality

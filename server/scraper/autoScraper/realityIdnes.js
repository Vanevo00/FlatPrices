const saveFlat = require('../saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')

const realityIdnes = async () => {
  console.log('Scraping Reality Idnes...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.idnesScraper) {
      console.log(`Scraping ${city.name}`)

      const getPages = async () => {
        const fetchedPage = await axios.get(city.idnesScraper)
        const $ = await cheerio.load(fetchedPage.data)
        let lastPage = parseInt($('.paging__next').prev().text().trim())
        if (isNaN(lastPage)) {
          return 1
        }
        return lastPage
      }

      const getLinks = async () => {
        const links = []
        const lastPage = await getPages()
        for (let i = 1; i <= lastPage; i++) {
          console.log(`fetching page no. ${i}`)
          const fetchedPage = await axios.get(`${city.idnesScraper}${i === 1 ? '' : '?page=' + String(i - 1)}`)
          console.log(`${city.idnesScraper}${i === 1 ? '' : '?page=' + String(i - 1)}`)
          const $ = await cheerio.load(fetchedPage.data)
          $('.c-list-products__content a').each( (i, el) => {
            links.push(`https://reality.idnes.cz${el.attribs.href}`)
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

          flat.agency = $('#pull-me .b-author__info a.font-bold').text().trim()
          if (!flat.agency) {
            flat.agency = $('h2.b-author__title a').text().trim()
          }
          if (/re\/?max/gi.test(flat.agency)) {
            flat.agency = 'Remax'
          }

          const locationInfo = $('.b-detail__info').text().trim().split(',')
          if (locationInfo.length < 2) {
            flat.address = 'unknown'
            const neighbourhoodInfo = locationInfo[0].split(' - ')[1]
            if (neighbourhoodInfo) {
              flat.neighbourhood = neighbourhoodInfo
            } else {
              flat.neighbourhood = 'unknown'
            }
          } else {
            flat.address = locationInfo[0]
            const neighbourhoodInfo = locationInfo[1].split(' - ')[1]
            if (neighbourhoodInfo) {
              flat.neighbourhood = neighbourhoodInfo
            } else {
              flat.neighbourhood = 'unknown'
            }
          }
          if (flat.address === city.name) {
            flat.address = 'unknown'
          }
          if (flat.neighbourhood === city.name) {
            flat.neighbourhood = 'unknown'
          }

          flat.squareMeters = parseInt($('h1.b-detail__title').text().trim().split(',')[1].trim().split(' ')[0])

          flat.priceCZK = parseInt($('dt:contains("Cena")').next().text().trim().split('Kč')[0].trim().split(' ').join(''))

          flat.rooms = $('h1.b-detail__title').text().trim().split(',')[0].split('bytu')[1].trim()
          if (flat.rooms === 'atypického') {
            flat.rooms = 'atypický'
          }

          const mainImage = ($('.b-gallery__img-lg a').attr('href'))
          if (mainImage && mainImage.includes('.jpg')) {
            flat.mainImage = mainImage
          }

          saveFlat.saveFlat(flat)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
  console.log(`reality Idnes scraping session finished at ${new Date()}`)
}

module.exports = realityIdnes

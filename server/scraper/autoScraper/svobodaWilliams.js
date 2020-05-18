const saveFlat = require('../saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const config = require('config')


const svobodaWilliams = async () => {
  console.log('Scraping Svoboda & Williams...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.svobodaWilliamsScraper) {
      console.log(`Scraping ${city.name}`)

      const getPages = async () => {
        const pages = []
        let pageNo = 1
        while (true) {
          try {
            await axios.get(city.svobodaWilliamsScraper + pageNo)
            pages.push(city.svobodaWilliamsScraper + pageNo)
            pageNo++
          } catch {
            break
          }
        }
        console.log(`${pages.length} pages successfully loaded, getting links..`)
        return pages
      }

      const getLinks = async () => {
        const links = []
        for (const page of await getPages()) {
          const fetchedPage = await axios.get(page)
          const $ = await cheerio.load(fetchedPage.data)
          $('a.item__headline').each((i, el) => {
            links.push(el.attribs.href)
          })
        }
        console.log(`${links.length} links successfully loaded, getting flat information..`)
        return links
      }

      for (const flatUrl of await getLinks()) {
        const flat = {
          agency: 'Svoboda & Williams',
          link: flatUrl,
          city: city.name
        }

        const result = await axios.get(flatUrl)
        const $ = await cheerio.load(result.data)

        const interior = ($('.header--landing__left small').text().trim().split(',')[0].split(/\s{1}/))
        interior.pop()
        interior.shift()
        flat.squareMeters = parseInt(interior.join(''))

        let location = $('.page-detail__header-link__map').text()
        location = location.split(',')
        flat.address = location[location.length - 1].trim()
        flat.neighbourhoodNumber = location[0]

        const price = $('.header--landing__right--button h2').text().trim()
        const priceStr = price.split(' ')[0]
        flat.priceCZK = parseInt(priceStr.split(/\s{1}/).join(''))

        flat.pricePerMeter = parseFloat((flat.priceCZK / flat.squareMeters).toFixed(2))

        const roomInfo = $('.header--landing__left > h1').text()
        const rooms = roomInfo.substr(4, (roomInfo.indexOf('P') - 4))
        if (rooms.match(/^\d/)) {
          flat.rooms = rooms
        } else {
          flat.rooms = 'Unknown'
        }
        const neighbourhood = roomInfo.split(',')[1]
        if (neighbourhood) {
          flat.neighbourhood = neighbourhood.trim()
        } else {
          flat.neighbourhood = 'Unknown'
        }

        saveFlat.saveFlat(flat)
      }
    }
  }
  console.log(`Svoboda & Williams scraping session finished at ${new Date()}`)
}


module.exports = svobodaWilliams

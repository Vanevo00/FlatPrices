const axios = require('axios')
const saveFlat = require('../saveFlat')
const config = require('config')
const cheerio = require('cheerio')

const remax = async () => {
  console.log('Scraping Remax...')

  const {
    data: cityData
  } = await axios.get(`${config.get('dbAddress')}/api/cities`)

  for (const city of cityData) {
    if (city.remaxScraper) {
      console.log(`Scraping ${city.name}`)

      const getPages = async () => {
        let lastPage = 1
        const fetchedPage = await axios.get(city.remaxScraper)
        const $ = await cheerio.load(fetchedPage.data)
        $('.pagination li a').each((i, el) => {
          if (parseInt(el.children[0].data) > lastPage) {
            lastPage = parseInt(el.children[0].data)
          }
        })
        console.log(`${lastPage} pages successfully loaded, getting links..`)
        return lastPage
      }

      const getLinks = async () => {
        const links = []
        const lastPage = await getPages()
        for (let i = 1; i <= lastPage; i++) {
          const fetchedPage = await axios.get(`${city.remaxScraper}&stranka=${i}`)
          const $ = await cheerio.load(fetchedPage.data)
          $('a.pl-items__link').each((i, el) => {
            links.push(`https://www.remax-czech.cz${el.attribs.href}`)
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
            agency: 'Remax',
            link: flatUrl,
            city: city.name
          }

          const result = await axios.get(flatUrl)
          const $ = await cheerio.load(result.data)

          const location = $('.pd-header__address').text().trim()
          const [street, area] = location.split(',')
          const neighbourhoodName = location.split('–')[1].trim()
          let neighbourhood = neighbourhoodName.split(' ')
          neighbourhood.pop()
          neighbourhood = neighbourhood.join(' ')
          const pragueNumber = area.trim().split(' ')[1].substring(0, 2)
          const streetArr = street.split(' ')
          streetArr.shift()
          const address = streetArr.join(' ')
          flat.neighbourhoodNumber = city.name === 'Praha' ? `Praha ${pragueNumber.trim()}` : undefined
          flat.address = address
          flat.neighbourhood = neighbourhood

          const size = $('.pd-detail-info__row > div:contains("Celková plocha:")').next().text()
          flat.squareMeters = parseInt(size.split(' ')[0])

          const priceDetails = $('.pd-header__price').text().trim()
          const priceStr = priceDetails.split('Kč')[0]
          flat.priceCZK = parseInt(priceStr.split(/\s{1}/).join(''))

          flat.pricePerMeter = parseFloat((flat.priceCZK / flat.squareMeters).toFixed(2))

          flat.mainImage = $('.gallery__main-img-inner > img').attr('src')

          const rooms = $('.pd-detail-info__row > div:contains("Dispozice:")').next().text()
          if (!rooms) {
            flat.rooms = 'Unknown'
          } else {
            flat.rooms = rooms
          }

          saveFlat.saveFlat(flat)
        } catch (err) {
          console.log('skip due to error')
          console.log(err)
        }
      }
    }
  }

  console.log(`Remax scraping session finished at ${new Date()}`)
}

module.exports = remax

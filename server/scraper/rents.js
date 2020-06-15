const axios = require('axios')
const config = require('config')
const saveRent = require('./saveRent')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const rents = async () => {
    console.log('Scraping rents...')

    const {
      data: cityData
    } = await axios.get(`${config.get('dbAddress')}/api/cities`)

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)

    for (const city of cityData) {
      if (city.rentScraper) {
        console.log(`Scraping ${city.name} rents...`)

        const getLinks = async () => {
          console.log('Fetching flat links..')
          let currPage = 1
          const links = []
          let numberLinks = 0
          while (true) {
            try {
              console.log(`fetching page no. ${currPage}`)
              await page.goto(`${city.rentScraper}&strana=${currPage}`, {waitUntil: 'networkidle2'})
              const content = await page.content()
              const $ = await cheerio.load(content)
              $('.basic a').each((i, el) => {
                links.push(`https://www.sreality.cz${el.attribs.href}`)
              })

              if (numberLinks === links.length) {
                break
              } else {
                currPage++
                numberLinks = links.length
              }
            } catch (err) {
              console.log(err)
              break
            }
          }
          console.log(`Fetched ${links.length} flat links, getting rent information..`)
          return links
        }

        for (const flatUrl of await getLinks()) {
          try {
            //find already scraped flat and skip it
            const scrapedFlat = await axios.post(
              `${config.get('dbAddress')}/api/rents/byLink`,
              {link: flatUrl})

            if (scrapedFlat.data) {
              console.log(`skipping already scraped flat ${flatUrl}`)
              continue
            }

            const flat = {
              link: flatUrl,
              city: city.name
            }

            await page.goto(flatUrl)
            const content = await page.content()
            const $ = await cheerio.load(content)

            const location = $('.location-text').text()
            const splitLocation = location.split(',')
            let neighbourhoodNumber = ''
            if (splitLocation[1]) {
              neighbourhoodNumber = splitLocation[1].split('-')[0]
              address = splitLocation[0]
            } else {
              neighbourhoodNumber = splitLocation[0].split('-')[0]
              address = 'Unknown'
            }
            neighbourhoodNumber = neighbourhoodNumber.trim()
            const neighbourhood = location.split('-')[1]
            if (neighbourhood) {
              flat.neighbourhood = (neighbourhood.trim())
            } else {
              flat.neighbourhood = `${city.name} - unknown`
            }

            flat.neighbourhoodNumber = neighbourhoodNumber
            flat.address = address

            const size = $('label:contains("Užitná plocha:")').next().text().trim()
            flat.squareMeters = parseInt(size.split(' ')[0])

            const roomsText = $('.name.ng-binding').text()
            const rooms = roomsText.split(' ')[2]
            if (!rooms) {
              flat.rooms = 'Unknown'
            } else {
              flat.rooms = rooms.split(/\s{1}/)[0]
            }

            const price = $('.norm-price').text()
            const priceNo = price.split(/\s{1}/)
            priceNo.pop()
            flat.rentCZK = parseInt(priceNo.join(''))

            saveRent.saveRent(flat)
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    console.log('Rent scraping session finished!')
}

module.exports = rents

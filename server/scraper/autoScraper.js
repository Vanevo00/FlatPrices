const cron = require('node-cron')
const axios = require('axios')
const config = require('config')
const saveFlat = require('./saveFlat')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')



const autoScraper = async () => {
  cron.schedule('0 9,15,20 * * *', async() => {
    const {
        data: cityData
    } = await axios.get(`${config.get('dbAddress')}/api/cities`)

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)

    for (const city of cityData) {
        if (city.srealityScraper) {
            console.log(`Scraping ${city.name}`)
            const getLinks = async () => {
                console.log('Fetching flat links..')
                let currPage = 1
                const links = []
                let numberLinks = 0
                while (true) {
                    try {
                        console.log(`fetching page no. ${currPage}`)
                        await page.goto(`${city.srealityScraper}&strana=${currPage}`)
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
                console.log(`Fetched ${links.length} flat links, getting flat information..`)
                return links
            }

            for (const flatUrl of await getLinks()) {
                try {
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

                    const price = $('.norm-price').text()
                    const priceNo = price.split(/\s{1}/)
                    priceNo.pop()
                    flat.priceCZK = parseInt(priceNo.join(''))

                    pricePerMeter = (flat.priceCZK / flat.squareMeters).toFixed(2)
                    flat.pricePerMeter = parseFloat(pricePerMeter)

                    let agencyName = $('li.line.name').text()
                    if (!agencyName) {
                        agencyName = 'Unknown'
                    }
                    flat.agency = agencyName

                    const roomsText = $('.name.ng-binding').text()
                    const rooms = roomsText.split(' ')[2]
                    if (!rooms) {
                        flat.rooms = 'Unknown'
                    } else {
                        flat.rooms = rooms.split(/\s{1}/)[0]
                    }

                    saveFlat.saveFlat(flat)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
    console.log('Scraping session finished!')
    await browser.close()
  }, {
      timezone: "Europe/Prague"
  })
}

module.exports = autoScraper

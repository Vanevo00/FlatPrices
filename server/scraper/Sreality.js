const saveFlat = require('./saveFlat')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const pragueUrl = 'https://www.sreality.cz/hledani/prodej/byty/praha-8,praha-7,praha-6,praha-5,praha-1,praha-2,praha-3?stavba=cihlova&vlastnictvi=osobni&patro-od=2&patro-do=100&plocha-od=85&plocha-do=10000000000&cena-od=0&cena-do=15000000'

const kolinUrl = 'https://www.sreality.cz/hledani/prodej/byty?region=obec%20Kol%C3%ADn&region-id=3412&region-typ=municipality'

const kralupyUrl = 'https://www.sreality.cz/hledani/prodej/byty?region=obec%20Kralupy%20nad%20Vltavou&region-id=3878&region-typ=municipality'

const fetchSreality = async (searchedCity) => {
  let siteUrl

  switch (searchedCity) {
    case ('Praha'):
      siteUrl = pragueUrl
      break
    case ('Kolín'):
      siteUrl = kolinUrl
      break
    case ('Kralupy nad Vltavou'):
      siteUrl = kralupyUrl
      break
    default:
      return console.log('Invalid city name, try again')
  }

  console.log(`Scraping ${searchedCity} flats listed by Sreality..`)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(0)

  const getLinks = async () => {
    console.log('Fetching flat links..')
    let currPage = 1
    const links = []
    let numberLinks = 0
    while (true) {
      try {
        console.log(`fetching page no. ${currPage}`)
        await page.goto(`${siteUrl}&strana=${currPage}`)
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
        city: searchedCity
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
        flat.neighbourhood = `${searchedCity} - unknown`
      }

      flat.neighbourhoodNumber = neighbourhoodNumber
      flat.address = address

      const size = $('label:contains("Užitná plocha:")').next().text().trim()
      flat.squareMeters = parseInt(size.split(' ')[0])

      const price = $('.norm-price').text()
      const priceNo = price.split(/\s{1}/)
      priceNo.pop()
      flat.priceCZK = parseInt(priceNo.join(''))

      pricePerMeter = (flat.price / flat.squareMeters).toFixed(2)
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

  await browser.close()
}

readline.question('Select a city to scrape: Praha, Kolín, Kralupy nad Vltavou: ', (userInput) => {
  fetchSreality(userInput)
  readline.close()
})

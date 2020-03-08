const saveRent = require('./saveRent')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const kolinUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20Kol%C3%ADn&region-id=3412&region-typ=municipality'

const kralupyUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20Kralupy%20nad%20Vltavou&region-id=3878&region-typ=municipality'

const ustiUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20%C3%9Ast%C3%AD%20nad%20Labem&region-id=1244&region-typ=municipality'

const mostUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20Most&region-id=2048&region-typ=municipality'

const hraniceUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20Hranice&region-id=104&region-typ=municipality'

const valmezUrl = 'https://www.sreality.cz/hledani/pronajem/byty?region=obec%20Vala%C5%A1sk%C3%A9%20Mezi%C5%99%C3%AD%C4%8D%C3%AD&region-id=610&region-typ=municipality'

const fetchRents = async (searchedCity) => {
  let siteUrl

  switch (searchedCity) {
    case ('Kralupy nad Vltavou'):
      siteUrl = kralupyUrl
      break
    case ('Kolín'):
      siteUrl = kolinUrl
      break
    case ('Ústí nad Labem'):
      siteUrl = ustiUrl
      break
    case ('Most'):
      siteUrl = mostUrl
      break
    case ('Hranice'):
      siteUrl = hraniceUrl
      break
    case ('Valašské Meziříčí'):
      siteUrl = valmezUrl
      break
    default:
      return console.log('Invalid city name, try again')
  }

  console.log(`Scraping ${searchedCity} rents..`)

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
    console.log(`Fetched ${links.length} flat links, getting rent information..`)
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

  await browser.close()
}

readline.question('Select a city to scrape: Kolín, Kralupy nad Vltavou, Ústí nad Labem, Most, Valašské Meziříčí, Hranice: ', (userInput) => {
  fetchRents(userInput)
  readline.close()
})

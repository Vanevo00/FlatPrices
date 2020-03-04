const saveFlat = require('./saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const pragueUrl = 'https://www.remax-czech.cz/reality/vyhledavani/?regions%5B19%5D%5B19%5D=on&regions%5B19%5D%5B27%5D=on&regions%5B19%5D%5B35%5D=on&regions%5B19%5D%5B51%5D=on&regions%5B19%5D%5B60%5D=on&regions%5B19%5D%5B78%5D=on&regions%5B19%5D%5B86%5D=on&sale=1&types%5B4%5D=on'

const kolinUrl = 'https://www.remax-czech.cz/reality/vyhledavani/?desc_text=Kol%C3%ADn&regions%5B27%5D%5B3204%5D=on&sale=1&types%5B4%5D=on'

const kralupyUrl = ''

const fetchRemax = async (searchedCity) => {
  let siteUrl

  switch (searchedCity) {
    case ('Praha'):
      siteUrl = pragueUrl
      break
    case ('Kolín'):
      siteUrl = kolinUrl
      break
    default:
      return console.log('Invalid city name, try again')
  }

  console.log(`Scraping ${searchedCity} flats listed by Remax..`)

  const getPages = async () => {
    let lastPage = 1
    const fetchedPage = await axios.get(siteUrl)
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
      const fetchedPage = await axios.get(`${siteUrl}&stranka=${i}`)
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
      const flat = {
        agency: 'Remax',
        link: flatUrl,
        city: searchedCity
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
      flat.neighbourhoodNumber = `Praha ${pragueNumber.trim()}`
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
    } catch {
      console.log('skip due to error')
    }
  }
}

readline.question('Select a city to scrape: Praha, Kolín: ', (userInput) => {
  fetchRemax(userInput)
  readline.close()
})

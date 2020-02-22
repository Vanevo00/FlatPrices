const saveFlat = require('./saveFlat')
const axios = require('axios')
const cheerio = require('cheerio')

const siteUrl = 'https://www.nextreality.cz/reality?listing_filter%5Btyp_nemovitosti%5D%5B0%5D=4&listing_filter%5Btyp_nabidky%5D%5B0%5D=1&listing_filter%5Bdispozice_bytu%5D%5B0%5D=2&listing_filter%5Bdispozice_bytu%5D%5B1%5D=9&listing_filter%5Bdispozice_bytu%5D%5B2%5D=3&listing_filter%5Bdispozice_bytu%5D%5B3%5D=10&listing_filter%5Bdispozice_bytu%5D%5B4%5D=4&listing_filter%5Bdispozice_bytu%5D%5B5%5D=11&listing_filter%5Bdispozice_bytu%5D%5B6%5D=5&listing_filter%5Bdispozice_bytu%5D%5B7%5D=12&listing_filter%5Bdispozice_bytu%5D%5B8%5D=6&listing_filter%5Bdispozice_bytu%5D%5B9%5D=13&listing_filter%5Bdispozice_bytu%5D%5B10%5D=7&listing_filter%5Bdispozice_bytu%5D%5B11%5D=14&listing_filter%5Bdispozice_bytu%5D%5B12%5D=8&listing_filter%5Bdispozice_bytu%5D%5B13%5D=15&listing_filter%5Bdispozice_bytu%5D%5B14%5D=16&listing_filter%5Blokalita%5D%5B0%5D=19&listing_filter%5Bkraj_19%5D%5B0%5D=19&listing_filter%5Bkraj_19%5D%5B1%5D=27&listing_filter%5Bkraj_19%5D%5B2%5D=35&listing_filter%5Bkraj_19%5D%5B3%5D=51&listing_filter%5Bkraj_19%5D%5B4%5D=60&listing_filter%5Bkraj_19%5D%5B5%5D=78&listing_filter%5Bkraj_19%5D%5B6%5D=86&listing_filter%5Bcena_od%5D=&listing_filter%5Bcena_do%5D=&listing_filter%5Bklicova_slova%5D=&listing_filter%5Bplocha_od%5D=&listing_filter%5Bplocha_do%5D=&listing_filter%5Bstari_nemovitosti%5D=&page=1'

const fetchData = async () => {
  const result = await axios.get(siteUrl)
  return cheerio.load(result.data)
}

const fetchNextReality = async () => {
  console.log('Scraping Next Reality..')

  const $ = await fetchData()

  const getPages = () => {
    const pages = []
    $('.pagination a').each((i, el) => {
      const href = `https://www.nextreality.cz${$(el).attr('href').trim()}`
      pages.push(href)
    })
    pages.pop() // get rid of the last href - the arrow
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
    const flat = {
      agency: 'Next Reality',
      link: flatUrl
    }
    const result = await axios.get(flatUrl)
    const $ = await cheerio.load(result.data)

    const location = $('.info > div:contains("Adresa:") > .col-xs-7').text()
    const address = location.split(',')[0]
    const neighbourhood = location.split(',')[2].trim()
    flat.address = address
    flat.neighbourhood = neighbourhood

    const size = $('.info div:contains("Užitná plocha") > .col-xs-7').text()
    flat.squareMeters = parseInt(size.split(' ')[0])

    const price = $('.info div:contains("Cena:") > .col-xs-7').text()
    flat.priceCZK = parseInt(price.split(',')[0].split(' ').join(''))

    flat.pricePerMeter = parseFloat((flat.priceCZK / flat.squareMeters).toFixed(2))

    flat.mainImage = $('.main img').attr('src')

    saveFlat.saveFlat(flat)
  }
}

module.exports = fetchNextReality

const saveFlat = require('./saveFlat')
const puppeteer = require('puppeteer')

const siteUrl = 'https://www.sreality.cz/hledani/prodej/byty/praha-8,praha-7,praha-6,praha-5,praha-1,praha-2,praha-3?stavba=cihlova&vlastnictvi=osobni&patro-od=2&patro-do=100&plocha-od=85&plocha-do=10000000000&cena-od=0&cena-do=15000000'

const fetchSreality = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()


    await page.goto(siteUrl, { waitUntil: 'networkidle2'})
    const data = await page.evaluate(() => {
      const title = document.querySelector('.page-title').innerText

      return {
        title
      }
    })

    console.log(data)

    // await browser.close()
  } catch (err) {
    console.log(err)
  }


  // const fetchedPage = await axios.get(siteUrl)
  // console.log(fetchedPage.data)
  // const $ = await cheerio.load(fetchedPage.data)
  // const title = $('.ng-scope > h1').text()
  // console.log(title)
}

module.exports = fetchSreality

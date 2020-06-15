const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')
const nextReality = require('./nextReality')
const remax = require('./remax')
const svobodaWilliams = require('./svobodaWilliams')
const realityMat = require('./realityMat')
const realityIdnes = require('./realityIdnes')

const autoScraper = () => {
  cron.schedule('0 8,12,14,17,22 * * *', async() => {
    await sreality()
    await realityIdnes()
  },{
    timezone: "Europe/Prague"
  })

  cron.schedule('0 13 * * *', async () => {
    await nextReality()
    await remax()
    await svobodaWilliams()
    await realityMat()
  }, {
    timezone: "Europe/Prague"
  })

  remax()

  cron.schedule('0 11 * * *', () => {
  rents()
  }, {
  timezone: "Europe/Prague"
  })
}

module.exports = autoScraper

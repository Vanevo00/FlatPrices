const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')
const nextReality = require('./nextReality')
const remax = require('./remax')
const svobodaWilliams = require('./svobodaWilliams')
const realityMat = require('./realityMat')
const realityIdnes = require('./realityIdnes')
const bezrealitky = require('./bezrealitky')

const autoScraper = () => {
  cron.schedule('0 12,17,22 * * *', async() => {
    await sreality()
    await realityIdnes()
  },{
    timezone: "Europe/Prague"
  })

  cron.schedule('0 14 * * *', async () => {
    await nextReality()
    await remax()
    await svobodaWilliams()
    await realityMat()
    await bezrealitky()
  }, {
    timezone: "Europe/Prague"
  })

  cron.schedule('0 11 * * *', () => {
  rents()
  }, {
  timezone: "Europe/Prague"
  })
}

module.exports = autoScraper

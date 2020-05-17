const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')
const nextReality = require('./nextReality')
const remax = require('./remax')

const autoScraper = () => {
  cron.schedule('0 8,14,17,22 * * *', () => {
    sreality()
  },{
    timezone: "Europe/Prague"
  })

  cron.schedule('0 13 * * *', async () => {
    await nextReality()
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

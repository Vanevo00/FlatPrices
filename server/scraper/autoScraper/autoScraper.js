const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')
const nextReality = require('./nextReality')

const autoScraper = () => {
  cron.schedule('40 8,14,18,22 * * *', () => {
    sreality()
  },{
    timezone: "Europe/Prague"
  })

  cron.schedule('0 13 * * *', async () => {
    await nextReality()
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

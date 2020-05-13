const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')

const autoScraper = () => {
  cron.schedule('0 8,14,18,22 * * *', async() => {
    sreality()
  },{
    timezone: "Europe/Prague"
  })

  cron.schedule('0 11 * * *', async() => {
  rents()
  }, {
  timezone: "Europe/Prague"
})
}

module.exports = autoScraper

const cron = require('node-cron')
const sreality = require('./sreality')
const rents = require('./rents')

const autoScraper = () => {
  // cron.schedule('42 8,14,18 * * *', async() => {
    sreality()
  // },{
  //   timezone: "Europe/Prague"
  // })

  rents()
}

module.exports = autoScraper

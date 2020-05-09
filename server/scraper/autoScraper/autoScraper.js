const sreality = require('./sreality')
const rents = require('./rents')

const autoScraper = () => {
  sreality()
  rents()
}

module.exports = autoScraper

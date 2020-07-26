const sreality = require('./sreality')
const rents = require('./rents')
const nextReality = require('./nextReality')
const remax = require('./remax')
const svobodaWilliams = require('./svobodaWilliams')
const realityMat = require('./realityMat')
const realityIdnes = require('./realityIdnes')
const bezrealitky = require('./bezrealitky')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const scrapeServer = async (userInput) => {
  switch(userInput) {
    case('nextReality'):
      nextReality()
      break
    case('sreality'):
      sreality()
      break
    case('rents'):
      rents()
      break
    case('remax'):
      remax()
      break
    case('svobodaWilliams'):
      svobodaWilliams()
      break
    case('realityMat'):
      realityMat()
      break
    case('realityIdnes'):
      realityIdnes()
      break
    case('bezrealitky'):
      bezrealitky()
      break
    case('all'):
      await bezrealitky()
      await nextReality()
      await remax()
      await svobodaWilliams()
      await realityMat()
      await realityIdnes()
      await sreality()
      await rents()
      break
    default:
      console.log('Invalid input')
  }
}

readline.question('What do you want to scrape?\nsreality, rents, nextReality, remax, svobodaWilliams, realityMat, realityIdnes, bezrealitky, all\n', (userInput) => {
  scrapeServer(userInput)
  readline.close()
})

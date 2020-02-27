const nextReality = require('./NextReality')
const svobodaWilliams = require('./SvobodaWilliams')
const remax = require('./Remax')
const sreality = require('./Sreality')

const fetchFlats = async () => {
  // await nextReality()
  // await svobodaWilliams()
  // await remax()
  await sreality()
}

fetchFlats()

const nextReality = require('./NextReality')
const svobodaWilliams = require('./SvobodaWilliams')
const sreality = require('./Sreality')

const fetchFlats = async () => {
  await nextReality()
  await sreality()
  await svobodaWilliams()
}

fetchFlats()

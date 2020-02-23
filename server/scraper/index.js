const nextReality = require('./NextReality')
const svobodaWilliams = require('./SvobodaWilliams')
const remax = require('./Remax')

const fetchFlats = async () => {
  await nextReality()
  await svobodaWilliams()
  await remax()
}

fetchFlats()

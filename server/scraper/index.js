const nextReality = require('./NextReality')
const svobodaWilliams = require('./SvobodaWilliams')

const fetchFlats = async () => {
  await nextReality()
  await svobodaWilliams()
}

fetchFlats()

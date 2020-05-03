const axios = require('axios')
const config = require('config')

const saveFlat = async (flat) => {
  try {
    // eliminate flats that are without price (typically reserved)
    if (!flat.priceCZK) {
      return console.log(`skipping, flat price: ${flat.priceCZK}`)
    }

    // eliminate duplicit flats
    const duplicitFlat = await axios.post(`${config.get('dbAddress')}/api/flats/searchByParameters`, {
      address: flat.address,
      squareMeters: flat.squareMeters,
      priceCZK: flat.priceCZK,
      agency: flat.agency
    })
    if (duplicitFlat.data.length > 0) {
      return console.log(`Duplicit flat found: ${flat.address}. Not saved.`)
    }

    // fetch city or create it if it doesn't exist
    let city = await axios.get(`${config.get('dbAddress')}/api/cities/byExactName/${encodeURIComponent(flat.city)}`)
    if (!city.data) {
      city = await axios.post(`${config.get('dbAddress')}/api/cities/`, {
        name: flat.city,
        country: 'Czech Republic'
      })
      console.log(`New city created: ${city.data.name}!`)
    }

    // fetch neighbourhood or create it if it doesn't exist
    let neighbourhood = await axios.get(`http://localhost:4000/api/neighbourhoods/byExactName/${encodeURIComponent(flat.neighbourhood)}`)
    if (!neighbourhood.data) {
      neighbourhood = await axios.post(`${config.get('dbAddress')}/api/neighbourhoods/`, {
        city: city.data._id,
        name: flat.neighbourhood
      })
      console.log(`New neighbourhood created: ${neighbourhood.data.name}!`)
    }

    const newFlat = await axios.post(`${config.get('dbAddress')}/api/flats/`, {
      ...flat,
      neighbourhood: neighbourhood.data._id,
      city: city.data._id
    })

    console.log(newFlat.data)
  } catch (err) {
    console.error(err)
  }
}

exports.saveFlat = saveFlat

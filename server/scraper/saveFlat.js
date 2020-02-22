const axios = require('axios')

const saveFlat = async (flat) => {
  try {
    // eliminate flats that are without price (typically reserved)
    if (!flat.priceCZK) {
      return console.log(`skipping, flat price: ${flat.priceCZK}`)
    }

    // eliminate duplicit flats
    const duplicitFlat = await axios.post('http://localhost:4000/api/flats/searchByParameters', {
      address: flat.address,
      squareMeters: flat.squareMeters,
      priceCZK: flat.priceCZK,
      agency: flat.agency
    })
    if (duplicitFlat.data.length > 0) {
      return console.log(`Duplicit flat found: ${flat.address}. Not saved.`)
    }

    let neighbourhood = await axios.get(`http://localhost:4000/api/neighbourhoods/byExactName/${flat.neighbourhood}`)

    if (!neighbourhood.data) {
      neighbourhood = await axios.post('http://localhost:4000/api/neighbourhoods/', {
        city: '5e43147b633dd95fac66332a',
        name: flat.neighbourhood
      })
      console.log(`New neighbourhood created: ${neighbourhood.data.name}!`)
    }

    const newFlat = await axios.post('http://localhost:4000/api/flats/', {
      ...flat,
      neighbourhood: neighbourhood.data._id,
      city: neighbourhood.data.city
    })

    console.log(newFlat.data)
  } catch (err) {
    console.error(err)
  }
}

exports.saveFlat = saveFlat

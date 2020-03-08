const axios = require('axios')

const saveRent = async (flat) => {
  try {
    // eliminate flats that are without rent
    if (!flat.rentCZK) {
      return console.log(`skipping, flat rent: ${flat.priceCZK}`)
    }

    //eliminate flats without dispositions
    if (!flat.rooms) {
      return console.log(`skipping, dispositions: ${flat.rooms}`)
    }

    // eliminate duplicit flats
    const duplicitFlat = await axios.post('http://localhost:4000/api/flats/searchByParameters', {
      address: flat.address,
      squareMeters: flat.squareMeters,
      rentCZK: flat.rentCZK,
      rooms: flat.rooms
    })
    if (duplicitFlat.data.length > 0) {
      return console.log(`Duplicit rent found: ${flat.address}. Not saved.`)
    }

    // fetch city or create it if it doesn't exist
    let city = await axios.get(`http://localhost:4000/api/cities/byExactName/${encodeURIComponent(flat.city)}`)
    if (!city.data) {
      city = await axios.post('http://localhost:4000/api/cities/', {
        name: flat.city,
        country: 'Czech Republic'
      })
      console.log(`New city created: ${city.data.name}!`)
    }

    // fetch neighbourhood or create it if it doesn't exist
    let neighbourhood = await axios.get(`http://localhost:4000/api/neighbourhoods/byExactName/${encodeURIComponent(flat.neighbourhood)}`)
    if (!neighbourhood.data) {
      neighbourhood = await axios.post('http://localhost:4000/api/neighbourhoods/', {
        city: city.data._id,
        name: flat.neighbourhood
      })
      console.log(`New neighbourhood created: ${neighbourhood.data.name}!`)
    }

    const newRent = await axios.post('http://localhost:4000/api/rents/', {
      ...flat,
      neighbourhood: neighbourhood.data._id,
      city: city.data._id
    })

    console.log(newRent.data)
  } catch (err) {
    console.error(err)
  }
}

exports.saveRent = saveRent

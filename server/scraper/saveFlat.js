const axios = require("axios")

const saveFlat = async (flat) => {
  try {
    const data = await axios.get('http://localhost:4000/api/neighbourhoods')
    console.log(data)
  } catch(err) {
    console.error(err)
  }
}

exports.saveFlat = saveFlat

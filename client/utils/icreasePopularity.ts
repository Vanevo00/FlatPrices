import axios from 'axios'

const increasePopularity = async (_id) => {
  await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/increasePopularity/${_id}`)
}

export default increasePopularity

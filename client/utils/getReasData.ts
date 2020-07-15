import axios from 'axios'
import formatDate from './formatDate'
import { ReasData } from '../../Types/ReasData'

export default async (searchName, cityName, squareMeters): Promise<ReasData> => {
  const sizeSearch = squareMeters < 61 ? '[null, 60]' : '[60, null]'

  const suggestionSearch = await axios.get(`https://apis.reas.cz/atlas/suggestion?query=${searchName}, ${cityName}`)
  const correctArea = suggestionSearch.data.data.find((suggestion) => suggestion.city.toLowerCase().includes(cityName.toLowerCase()))
  if (!correctArea) {
    return undefined
  }

  const {
    bounds = []
  } = correctArea

  if (!bounds.length) {
    return undefined
  }

  const [
    [
      southWestLongitude,
      southWestLatitude
    ],
    [
      northEastLongitude,
      northEastLatitude
    ]
  ] = bounds

  const [medianPriceData, nearbyFlatsData] = await Promise.all([
    axios.get(`https://apis.reas.cz/atlas/calculator/median-price-per-m?bounds=%7B%22southWestLatitude%22:${southWestLatitude},%22southWestLongitude%22:${southWestLongitude},%22northEastLatitude%22:${northEastLatitude},%22northEastLongitude%22:${northEastLongitude}%7D&types=[%22flat%22]&areaRange=${sizeSearch}`),
    axios.get(`https://apis.reas.cz/atlas/map-pointers/list?types=[%22flat%22]&limit=10&page=1&areaRange=${sizeSearch}&includeCount=true&bounds=%7B%22southWestLatitude%22:${southWestLatitude},%22southWestLongitude%22:${southWestLongitude},%22northEastLatitude%22:${northEastLatitude},%22northEastLongitude%22:${northEastLongitude}%7D&date=%222018-7-14%22`)
  ])

  const medianPricePerMeter = medianPriceData.data.data
  const nearbySales = []

  nearbyFlatsData.data.data.map((nearbyFlat) => {
    nearbySales.push({
      address: `${nearbyFlat.street.name} ${nearbyFlat.address.numbers}`,
      pricePerMeter: parseInt(nearbyFlat.pricePerSquareM.toFixed(0)),
      dateOfSale: formatDate(nearbyFlat.date, false),
      area: `${nearbyFlat.area[0]}-${nearbyFlat.area[1]}m2`
    })
  })

  return {
    medianPricePerMeter,
    nearbySales
  }
}

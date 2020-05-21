interface Filters {
  timeLimit?: string
  minMeters?: string
  maxMeters?: string
  maxPrice?: string
  maxPricePerMeter?: string
  rooms?:string
}

module.exports = (filters: Filters) => {
  let finalFilter = {}

  //timeLimit will apply in every case
  let limit = new Date()
  switch(filters.timeLimit) {
    case 'month':
      limit.setMonth(limit.getMonth() - 1)
      break
    case 'year':
      limit.setFullYear(limit.getFullYear() - 1)
      break
    case 'all':
      limit.setFullYear(limit.getFullYear() - 30)
      break
    default:
      limit.setDate(limit.getDate() - 7)
  }
  finalFilter = {...finalFilter, createdAt: {$gte: limit}}

  if (filters.maxMeters) {
    finalFilter = {...finalFilter, squareMeters: {$lte: filters.maxMeters}}
  }

  if (filters.minMeters) {
    finalFilter = {...finalFilter, squareMeters: {$gte: filters.minMeters}}
  }

  if (filters.maxPrice) {
    finalFilter = {...finalFilter, priceCZK: {$lte: filters.maxPrice}}
  }

  if (filters.maxPricePerMeter) {
    finalFilter = {...finalFilter, pricePerMeter: {$lte: filters.maxPricePerMeter}}
  }

  if (filters.rooms) {
    const roomsArr = filters.rooms.split(',')
    finalFilter = {...finalFilter, rooms: {$in: roomsArr}}
  }

  return finalFilter
}

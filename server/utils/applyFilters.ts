interface Filters {
  timeLimit?: string
  minMeters?: string
  maxMeters?: string
  minPrice?: string
  maxPrice?: string
  minPricePerMeter?: string
  maxPricePerMeter?: string
  rooms?:string
  agency?: string
  address?: string
}

module.exports = (filters: Filters) => {
  let finalFilter = {}

  //timeLimit will apply in every case and is week by default
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

  if (filters.maxMeters && filters.minMeters) {
    finalFilter = {...finalFilter, squareMeters: {$lte: filters.maxMeters, $gte: filters.minMeters}}
  } else if (filters.maxMeters) {
    finalFilter = {...finalFilter, squareMeters: {$lte: filters.maxMeters}}
  } else if (filters.minMeters) {
    finalFilter = {...finalFilter, squareMeters: {$gte: filters.minMeters}}
  }

  if (filters.maxPrice && filters.minPrice) {
    finalFilter = {...finalFilter, priceCZK: {$lte: filters.maxPrice, $gte: filters.minPrice}}
  } else if (filters.maxPrice) {
    finalFilter = {...finalFilter, priceCZK: {$lte: filters.maxPrice}}
  } else if (filters.minPrice) {
    finalFilter = {...finalFilter, priceCZK: {$gte: filters.minPrice}}
  }

  if (filters.minPricePerMeter && filters.maxPricePerMeter) {
    finalFilter = {...finalFilter, pricePerMeter: {$lte: filters.maxPricePerMeter, $gte: filters.minPricePerMeter}}
  } else if (filters.maxPricePerMeter) {
    finalFilter = {...finalFilter, pricePerMeter: {$lte: filters.maxPricePerMeter}}
  } else if (filters.minPricePerMeter) {
    finalFilter = {...finalFilter, pricePerMeter: {$gte: filters.minPricePerMeter}}
  }

  if (filters.rooms) {
    const roomsArr = filters.rooms.split(',')
    finalFilter = {...finalFilter, rooms: {$in: roomsArr}}
  }

  if (filters.agency) {
    finalFilter = {...finalFilter, agency:  {$regex: '.*' + filters.agency + '.*', $options: 'i'}}
  }

  if (filters.address) {
    finalFilter = {...finalFilter, address: {$regex: '.*' + filters.address + '.*', $options: 'i'}}
  }

  return finalFilter
}

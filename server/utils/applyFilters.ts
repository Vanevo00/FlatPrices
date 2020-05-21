interface Filters {
  timeLimit?: string
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

    finalFilter = {...finalFilter, createdAt: {$gte: limit}}
  }

  return finalFilter
}

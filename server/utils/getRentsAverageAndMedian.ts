import { Rent } from '../../client/components/Types/Rent'

const sortHighestToLowest = require('./sortHighestToLowest')

module.exports = (rents: Rent[]) => {
  let rentsAmounts: number[] = []

  rents.map((rent: Rent) => {
    rentsAmounts.push(rent.rentCZK)
  })

  rentsAmounts = sortHighestToLowest(rentsAmounts)

  return {
    amounts: rentsAmounts,
    average: parseInt((rentsAmounts.reduce((a, b) => a + b, 0) / rentsAmounts.length).toFixed(2)),
    median: rentsAmounts[Math.ceil(rentsAmounts.length / 2) - 1]
  }
}

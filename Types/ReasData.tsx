export interface ReasData {
  medianPricePerMeter: number
  nearbySales: {
    address: string
    pricePerMeter: number
    dateOfSale: string
    area: string
  }[]
}

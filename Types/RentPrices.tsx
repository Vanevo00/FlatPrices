export interface RentPrices {
  rentPrices: number[]
  avgRent?: number
  medianRent?: number
  medianRentPerMeter?: number
  rents1kk?: {
    amounts: number[]
    average: number
    median: number
  }
  rents1plus1?: {
    amounts: number[]
    average: number
    median: number
  }
  rents2kk?: {
    amounts: number[]
    average: number
    median: number
  }
  rents2plus1?: {
    amounts: number[]
    average: number
    median: number
  }
  rents3kk?: {
    amounts: number[]
    average: number
    median: number
  }
  rents3plus1?: {
    amounts: number[]
    average: number
    median: number
  }
}

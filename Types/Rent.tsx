import { Neighbourhood } from './Neighbourhood'
import { City } from './City'

export interface Rent {
  _id: string
  address: string
  createdAt: string
  squareMeters: number
  rentCZK: number
  rentPerMeter: number
  link?: string
  neighbourhood: Neighbourhood
  city: City
  rooms: string
  neighboourhoodNumber?: string
}

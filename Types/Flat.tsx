import { Neighbourhood } from './Neighbourhood'
import { City } from './City'

export interface Flat {
  _id: string
  address: string
  contacted: boolean
  visited: boolean
  createdAt: string
  squareMeters: number
  priceCZK: number
  pricePerMeter: number
  agency?: string
  mainImage: string
  link: string
  neighbourhood: Neighbourhood
  city: City
  floor?: number
  lift?: boolean
  rooms?: string
  neighboourhoodNumber?: string
}

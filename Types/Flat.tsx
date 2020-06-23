import { Neighbourhood } from './Neighbourhood'
import { City } from './City'

export interface Flat {
  _id: string
  address: string
  contacted: boolean
  visited: string
  createdAt: string
  squareMeters: number
  priceCZK: number
  pricePerMeter: number
  agency?: string
  mainImage: string
  link: string
  neighbourhood: Neighbourhood
  city: City
  addedBy: string
  floor?: number
  lift?: boolean
  rooms?: string
  neighboourhoodNumber?: string
  contact?: string
  reasonForSelling?: string
  houseOwnershipStructure?: string
  ownershipStructure?: string
  lastSale?: string
  ownershipType?: string
  monthlyExpensesAssociation?: number
  monthlyExpensesOther?: number
  renovated?: string
  houseRenovated?: string
  parking?: boolean
  balcony?: boolean
  heating?: string
  publicTransport?: string
  mortgaged?: boolean
  cadastralInfo?: string
  notes?: string
}

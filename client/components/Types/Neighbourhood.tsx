import { City } from './City'

export interface Neighbourhood {
  _id: string
  name: string
  city: string | City
}

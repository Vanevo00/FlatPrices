import React from 'react'
import {
  DescriptionBody,
  DescriptionContainer,
  DescriptionHeader
} from './StyledFlatDetail'
import NearbySalesTable from './NearbySalesTable'

interface Props {
  nearbySales: {
    address: string
    pricePerMeter: number
    dateOfSale: string
    area: string
  }[]
  isLoading: boolean
}

const FlatNearbySales = ({ nearbySales, isLoading }: Props) => {
  if (!nearbySales || !nearbySales.length) return null

  return (
    <DescriptionContainer mt={1}>
      <DescriptionHeader>
        Flats sold nearby
      </DescriptionHeader>
      <DescriptionBody loading={isLoading}>
        {
          isLoading
            ? <p>Loading Price Information...</p>
            : <NearbySalesTable nearbySales={nearbySales}/>
        }
      </DescriptionBody>
    </DescriptionContainer>
  )
}

export default FlatNearbySales

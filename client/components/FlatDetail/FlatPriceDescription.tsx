import React from 'react'
import {
  DescriptionBody,
  DescriptionContainer,
  DescriptionHeader, DescriptionText,
  RentDescriptionText
} from './StyledFlatDetail'

interface Props {
  isLoading: boolean
  rentDescriptionText: string
  priceDescriptionText: string
}

const FlatPriceDescription = ( { isLoading, rentDescriptionText, priceDescriptionText }: Props ) => {
  return (
    <DescriptionContainer>
      <DescriptionHeader>
        Price Details
      </DescriptionHeader>
      <DescriptionBody loading={isLoading}>
        {
          isLoading
            ? <p>Loading Price Information...</p>
            : <>
              <DescriptionText>{priceDescriptionText}</DescriptionText>
              <RentDescriptionText marginTop={1}>{rentDescriptionText}</RentDescriptionText>
              </>
        }
      </DescriptionBody>
    </DescriptionContainer>
  )
}

export default FlatPriceDescription

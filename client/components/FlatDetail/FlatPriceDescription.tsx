import React, { useEffect, useState } from 'react'
import { Flat } from '../../../Types/Flat'
import { AvgPrice } from '../../../Types/AvgPrice'
import { RentPrices } from '../../../Types/RentPrices'
import axios from 'axios'
import {
  PriceDescriptionBody,
  PriceDescriptionContainer,
  PriceDescriptionHeader,
  PriceDescriptionText, RentDescriptionText
} from './StyledFlatDetail'
import describePriceDifference from '../../utils/describePriceDifference'
import usePriceDescription from './usePriceDescription'

interface Props {
  isLoading: boolean
  rentDescriptionText: string
  priceDescriptionText: string
}

const FlatPriceDescription = ( { isLoading, rentDescriptionText, priceDescriptionText }: Props ) => {
  return (
    <PriceDescriptionContainer>
      <PriceDescriptionHeader>
        Price Details
      </PriceDescriptionHeader>
      <PriceDescriptionBody loading={isLoading}>
        {
          isLoading
            ? <p>Loading Price Information...</p>
            : <>
              <PriceDescriptionText>{priceDescriptionText}</PriceDescriptionText>
              <PriceDescriptionText marginTop={1}>{rentDescriptionText}</PriceDescriptionText>
              </>
        }
      </PriceDescriptionBody>
    </PriceDescriptionContainer>
  )
}

export default FlatPriceDescription

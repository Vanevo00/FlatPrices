import React from 'react'
import { PriceDescription, PriceNumber, StyledAvgPriceTable } from './StyledAveragePriceTable'
import { AvgPrice } from '../Types/AvgPrice'

interface Props {
  avgPrice: AvgPrice
}

const AvgPriceTable = ({avgPrice}: Props) => {
  return (
    <StyledAvgPriceTable>
      <PriceDescription>Average price</PriceDescription>
      <PriceNumber>{avgPrice.avgPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
      <PriceDescription>Median price</PriceDescription>
      <PriceNumber>{avgPrice.medianPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
      <PriceDescription>Median price above 60 m<sup>2</sup></PriceDescription>
      <PriceNumber>{avgPrice.largeFlatPricesMedian ? avgPrice.largeFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
      <PriceDescription last={true}>Median price below 60 m<sup>2</sup></PriceDescription>
      <PriceNumber last={true}>{avgPrice.smallFlatPricesMedian > 0 ? avgPrice.smallFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
    </StyledAvgPriceTable>
  )
}

export default AvgPriceTable

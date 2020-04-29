import React from 'react'
import { PriceDescription, PriceNumber, StyledAvgPriceTable } from './StyledAveragePriceTable'
import { AvgPrice } from '../../../Types/AvgPrice'
import { RentPrices } from '../../../Types/RentPrices'

interface Props {
  avgPrice: AvgPrice
  rentPrices: RentPrices
}

const AvgPriceTable = ({avgPrice, rentPrices}: Props) => {
  return (
    <div>
      <StyledAvgPriceTable>
        <PriceDescription>Average price</PriceDescription>
        <PriceNumber>{avgPrice.avgPrice && avgPrice.avgPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
        <PriceDescription>Median price</PriceDescription>
        <PriceNumber>{avgPrice.medianPrice && avgPrice.medianPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
        <PriceDescription>Median price above 60 m<sup>2</sup></PriceDescription>
        <PriceNumber>{avgPrice.largeFlatPricesMedian ? avgPrice.largeFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
        <PriceDescription last={true}>Median price below 60 m<sup>2</sup></PriceDescription>
        <PriceNumber last={true}>{avgPrice.smallFlatPricesMedian > 0 ? avgPrice.smallFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
      </StyledAvgPriceTable>


      {
        rentPrices.rents1plus1 && rentPrices.rents2plus1 &&  avgPrice.smallFlatPricesMedian && avgPrice.medianPrice &&
        <StyledAvgPriceTable>
          <PriceDescription>Estimated yearly return per 40m<sup>2</sup> 1+1 flat</PriceDescription>
          <PriceNumber>{(rentPrices.rents1plus1.median * 12).toLocaleString()} / {(avgPrice.smallFlatPricesMedian * 40).toLocaleString()} = {(((rentPrices.rents1plus1.median * 12) / (avgPrice.smallFlatPricesMedian * 40)) * 100).toFixed(2)}%</PriceNumber>
          <PriceDescription>Estimated yearly return per 60m<sup>2</sup> 2+1 flat</PriceDescription>
          <PriceNumber>{(rentPrices.rents2plus1.median * 12).toLocaleString()} / {(avgPrice.medianPrice * 60).toLocaleString()} = {(((rentPrices.rents2plus1.median * 12) / (avgPrice.medianPrice * 60)) * 100).toFixed(2)}%</PriceNumber>
        </StyledAvgPriceTable>
      }

    </div>

  )
}

export default AvgPriceTable

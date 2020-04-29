import React from 'react'
import { RentPrices } from '../../../Types/RentPrices'
import { HeaderItem, NormalItem, Row, StyledRentsContainer } from './StyledRentPricesTable'

interface Props {
  rentPrices: RentPrices
}

const RentPricesTable = ({rentPrices}: Props) => {
  return (
    <StyledRentsContainer>
      <Row>
        <HeaderItem width={34}>Dispositions</HeaderItem>
        <HeaderItem width={33}>Median Rent</HeaderItem>
        <HeaderItem width={33} last={true}>Average Rent</HeaderItem>
      </Row>
      <Row>
        <HeaderItem width={34}>1+kk ({rentPrices.rents1kk.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents1kk.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents1kk.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34}>1+1 ({rentPrices.rents1plus1.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents1plus1.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents1plus1.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34}>2+kk ({rentPrices.rents2kk.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents2kk.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents2kk.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34}>2+1 ({rentPrices.rents2plus1.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents2plus1.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents2plus1.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34}>3+kk ({rentPrices.rents3kk.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents3kk.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents3kk.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34}>3+1 ({rentPrices.rents3plus1.amounts.length} flats)</HeaderItem>
        <NormalItem width={33}>{rentPrices.rents3plus1.median || 'No Data'}</NormalItem>
        <NormalItem width={33} last={true}>{rentPrices.rents3plus1.average || 'No Data'}</NormalItem>
      </Row>
      <Row>
        <HeaderItem width={34} verticalLast={true}>All ({rentPrices.rentPrices.length} flats)</HeaderItem>
        <NormalItem width={33} verticalLast={true}>{rentPrices.medianRent || 'No Data'}</NormalItem>
        <NormalItem width={33} verticalLast={true} last={true}>{rentPrices.avgRent || 'No Data'}</NormalItem>
      </Row>

    </StyledRentsContainer>
  )
}

export default RentPricesTable

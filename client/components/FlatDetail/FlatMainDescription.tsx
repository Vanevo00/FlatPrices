import React from 'react'
import { Flat } from '../../../Types/Flat'
import { Data, Description, FlatInfoContainer, LeftSide, MainImage, RightSide, Row } from './StyledFlatDetail'
import formatDate from '../../utils/formatDate'

interface Props {
  flat: Flat
}

const FlatMainDescription = ({ flat }: Props) => {
  return (
  <>
    <LeftSide>
      <MainImage source={flat.mainImage ? flat.mainImage : flat.city.mainImageLink}/>
    </LeftSide>
    <RightSide>
      <FlatInfoContainer>
        <Row>
          <Description>
            Address
          </Description>
          <Data>
            {flat.address}
          </Data>
        </Row>
        <Row>
          <Description>
            City
          </Description>
          <Data>
            {flat.city.name}
          </Data>
        </Row>
        <Row>
          <Description>
            Neighbourhood
          </Description>
          <Data>
            {flat.neighbourhood.name}
          </Data>
        </Row>
        <Row>
          <Description>
            Size
          </Description>
          <Data>
            {flat.squareMeters}m<sup>2</sup>
          </Data>
        </Row>
        <Row>
          <Description>
            Dispositions
          </Description>
          <Data>
            {flat.rooms}
          </Data>
        </Row>
        <Row>
          <Description>
            Price
          </Description>
          <Data>
            CZK {flat.priceCZK.toLocaleString()},-
          </Data>
        </Row>
        <Row>
          <Description>
            Price per m<sup>2</sup>
          </Description>
          <Data>
            CZK {parseInt(flat.pricePerMeter.toFixed(0)).toLocaleString()},-
          </Data>
        </Row>
        <Row>
          <Description>
            Agency
          </Description>
          <Data>
            {flat.agency}
          </Data>
        </Row>
        <Row>
          <Description>
            Contact
          </Description>
          <Data>
            {flat.contact ? flat.contact : 'no contact info'}
          </Data>
        </Row>
        <Row>
          <Description last={true}>
            Created / Scraped
          </Description>
          <Data last={true}>
            {formatDate(flat.createdAt, true)}
          </Data>
        </Row>
      </FlatInfoContainer>
    </RightSide>
  </>
  )
}

export default FlatMainDescription

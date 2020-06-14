import React, { useEffect, useState } from 'react'
import { Flat } from '../../../Types/Flat'
import Spinner from '../Spinner/Spinner'
import {
  FlatHeading, ListingLink,
} from './StyledFlatDetail'
import FlatMainDescription from './FlatMainDescription'
import FlatPriceDescription from './FlatPriceDescription'

interface Props {
  flat: Flat
}


const FlatDetail = ({ flat }: Props) => {
  if (!flat) {
    return <Spinner/>
  }

  return (
    <>
      <FlatHeading>{flat.city.name}, {flat.address}, {flat.squareMeters}m<sup>2</sup>, CZK {flat.priceCZK.toLocaleString()},- [<ListingLink
        href={flat.link} target='_blank'>Go to listing</ListingLink>]</FlatHeading>
      <FlatMainDescription flat={flat}/>
      <FlatPriceDescription flat={flat}/>
    </>
  )
}

export default FlatDetail

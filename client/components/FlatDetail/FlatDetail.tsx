import React, { useContext } from 'react'
import { Flat } from '../../../Types/Flat'
import Spinner from '../Spinner/Spinner'
import {
  FlatHeading, ListingLink,
} from './StyledFlatDetail'
import FlatMainDescription from './FlatMainDescription'
import FlatPriceDescription from './FlatPriceDescription'
import AuthContext from '../../context/auth/authContext'
import EditButton from '../EditButton/EditButton'

interface Props {
  flat: Flat
}


const FlatDetail = ({ flat }: Props) => {
  const {
    isAuthenticated,
    user
  } = useContext(AuthContext)

  const isEntitledToEdit = () => {
    return user.isAdmin || user._id === flat.addedBy
  }

  if (!flat) {
    return <Spinner/>
  }

  return (
    <>
      <FlatHeading>{flat.city.name}, {flat.address}, {flat.squareMeters}m<sup>2</sup>, CZK {flat.priceCZK.toLocaleString()},- [<ListingLink
        href={flat.link} target='_blank'>Go to listing</ListingLink>]</FlatHeading>
      <FlatMainDescription flat={flat}/>
      <FlatPriceDescription flat={flat}/>
      { isAuthenticated && isEntitledToEdit() && <EditButton href={`/edit/flat/${flat._id}`}/>}
    </>
  )
}

export default FlatDetail

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
import FlatDocumentDownload from './FlatDocumentDownload'
import usePriceDescription from './usePriceDescription'
import FlatAdditionalInfo from './FlatAdditionalInfo'

interface Props {
  flat: Flat
}


const FlatDetail = ({ flat }: Props) => {
  const {
    isLoading,
    rentDescriptionText,
    priceDescriptionText
  } = usePriceDescription({ flat })

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
      <FlatPriceDescription
        isLoading={isLoading}
        priceDescriptionText={priceDescriptionText}
        rentDescriptionText={rentDescriptionText}
      />
      <FlatAdditionalInfo
        flat={flat}
      />
      <FlatDocumentDownload
        flat={flat}
        isLoading={isLoading}
        priceDescriptionText={priceDescriptionText}
        rentDescriptionText={rentDescriptionText}
      />
      { isAuthenticated && isEntitledToEdit() && <EditButton href={`/edit/flat/${flat._id}`}/>}
    </>
  )
}

export default FlatDetail

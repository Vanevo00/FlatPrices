import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { DetailContainer } from '../../components/StyledContainers'
import FlatDetail from '../../components/FlatDetail/FlatDetail'
import { Flat as FlatTypes } from '../../../Types/Flat'

const Flat = ({ _id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [flat, setFlat] = useState<FlatTypes>()

  const fetchFlat = async () => {
    setIsLoading(true)
    const foundFlat = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/search/${_id}`)
    setFlat(foundFlat.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchFlat()
  }, [])

  if (isLoading) {
    return (
      <Spinner/>
    )
  }

  return (
    <DetailContainer>
      <FlatDetail flat={flat}/>
    </DetailContainer>
  )
}

Flat.getInitialProps = async (context: { query: { _id: string } }) => {
  return {
    _id: context.query._id
  }
}

export default Flat

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../../components/Spinner/Spinner'
import { GeneralContainer } from '../../../components/StyledContainers'
import { Heading2Centered } from '../../../components/StyledHeadings'
import { Flat } from '../../../../Types/Flat'
import AuthContext from '../../../context/auth/authContext'
import FlatForm from '../../../components/Forms/FlatForm'

interface Props {
  _id: string
}

const EditFlat = ({ _id }: Props) => {
  const authContext = useContext(AuthContext)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [flat, setFlat] = useState<Flat>()

  const fetchFlat = async () => {
    setIsLoading(true)
    const foundFlat = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/search/${_id}`)
    setFlat(foundFlat.data)
    setIsLoading(false)
  }

  const onSubmit = async (data) => {
    try {
      const editedFlat = await axios.put(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/${_id}`, data)
      console.log(editedFlat.data)
      setSuccessMessage('Flat successfully edited')
    } catch (err) {
      console.log(err)
    }
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
    <GeneralContainer>
      <Heading2Centered>Edit Flat{flat && ` - ${flat.address}, ${flat.city.name}`}</Heading2Centered>
      <FlatForm authContext={authContext} buttonText='Edit Flat' onSubmit={onSubmit} successMessage={successMessage} flat={flat}/>
    </GeneralContainer>
  )
}

EditFlat.getInitialProps = async (context: any) => {
  const {
    query: {
      _id
    }
  } = context

  return {
    _id
  }
}

export default EditFlat

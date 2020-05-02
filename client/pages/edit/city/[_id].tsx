import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../../components/Spinner/Spinner'
import { GeneralContainer } from '../../../components/StyledContainers'
import { Heading2Centered } from '../../../components/StyledHeadings'
import CityForm from '../../../components/Forms/CityForm'
import Router from 'next/router'
import { limitToAdmin } from '../../../utils/limitToAdmin'
import AuthContext from '../../../context/auth/authContext'

interface Props {
  _id: string
}

const EditCity = ({_id}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState({
    name: '',
    country: '',
    mainImageLink: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const authContext = useContext(AuthContext)

  console.log(authContext)

  const fetchCity = async () => {
    setIsLoading(true)
    const cityData = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/${_id}`)
    setCity(cityData.data)
    setIsLoading(false)
  }

  const sendEditCity = async (name: string, country: string, externalImageLink: string, image: File) => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', name)
      formData.append('externalImageLink', externalImageLink)
      formData.append('country', country)
      const data = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/edit/${_id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      setSuccessMessage(`${data.data.name} successfully edited`)
      setTimeout(() => {
        Router.push(`/city/${data.data._id}`)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCity()
  }, [])

  return (
    isLoading ?
      <Spinner/>
      :
      <>
        <GeneralContainer>
          <Heading2Centered>Edit City: {city.name}</Heading2Centered>
          <CityForm buttonText='Edit City' onSubmit={sendEditCity} successMessage={successMessage} city={city}/>
        </GeneralContainer>
      </>
  )
}

EditCity.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

  export default limitToAdmin(EditCity);
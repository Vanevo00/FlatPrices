import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../../components/Spinner/Spinner'
import { GeneralContainer } from '../../../components/StyledContainers'
import { Heading2Centered } from '../../../components/StyledHeadings'
import CityForm from '../../../components/Forms/CityForm'
import Router from 'next/router'
import { limitToAdmin } from '../../../utils/limitToAdmin'
import DeleteButton from '../../../components/Forms/DeleteButton'

interface Props {
  _id: string
}

interface EditCityInputs {
  name: string
  country: string
  srealityScraper: string
  nextRealityScraper: string
  remaxScraper: string
  svobodaWilliamsScraper: string
  realityMatScraper: string
  idnesScraper: string
  rentScraper: string
  externalImageLink: string
  image: File
}

const EditCity = ({_id}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState({
    name: '',
    country: '',
    mainImageLink: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const fetchCity = async () => {
    setIsLoading(true)
    const cityData = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/${_id}`)
    setCity(cityData.data)
    setIsLoading(false)
  }

  const onSubmit = async (data) => {
    try {
      const cityData = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/edit/${_id}`, data)
      setSuccessMessage(`${cityData.data.name} successfully edited`)
      setTimeout(() => {
        Router.push(`/city/${cityData.data._id}`)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  const sendEditCity = async ({ name, country, srealityScraper, nextRealityScraper, remaxScraper, svobodaWilliamsScraper, realityMatScraper, idnesScraper, rentScraper, externalImageLink, image }: EditCityInputs) => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', name)
      formData.append('srealityScraper', srealityScraper)
      formData.append('nextRealityScraper', nextRealityScraper)
      formData.append('remaxScraper', remaxScraper)
      formData.append('svobodaWilliamsScraper', svobodaWilliamsScraper)
      formData.append('realityMatScraper', realityMatScraper)
      formData.append('idnesScraper', idnesScraper)
      formData.append('rentScraper', rentScraper)
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

  const deleteCity = async () => {
    await axios.delete(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/${_id}`)
    Router.push('/')
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
          <CityForm buttonText='Edit City' onSubmit={onSubmit} successMessage={successMessage} city={city}/>
          <DeleteButton name={city.name} callback={deleteCity}/>
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

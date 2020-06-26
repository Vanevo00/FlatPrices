import React, { useState } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import CityForm from '../../components/Forms/CityForm'
import { limitToLoggedIn } from '../../utils/limitToLoggedIn'

interface AddCityInputs {
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

const AddCity = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = async (data) => {
    try {
      const cityData = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/`, data)
      setSuccessMessage(`${cityData.data.name} successfully added`)
      setTimeout(() => {
        Router.push(`/city/${cityData.data._id}`)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <GeneralContainer>
        <Heading2Centered>Add New City</Heading2Centered>
        <CityForm buttonText='Add City' onSubmit={onSubmit} successMessage={successMessage}/>
      </GeneralContainer>
    </>
  )
}

export default limitToLoggedIn(AddCity)

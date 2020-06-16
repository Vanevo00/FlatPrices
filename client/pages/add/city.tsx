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

  const sendAddCity = async ({ name, country, srealityScraper, nextRealityScraper, remaxScraper, svobodaWilliamsScraper, realityMatScraper, idnesScraper, rentScraper, externalImageLink, image }: AddCityInputs) => {
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
      const data = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      setSuccessMessage(`${data.data.name} successfully added`)
      setTimeout(() => {
        Router.push(`/city/${data.data._id}`)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <GeneralContainer>
        <Heading2Centered>Add New City</Heading2Centered>
        <CityForm buttonText='Add City' onSubmit={sendAddCity} successMessage={successMessage}/>
      </GeneralContainer>
    </>
  )
}

export default limitToLoggedIn(AddCity)

import React, { useState } from 'react'
import axios from 'axios'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import CityForm from '../../components/Forms/CityForm'

const AddCity = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const sendAddCity = async (name: string, country: string, image: File) => {
    try {
      const data = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/`, {
        name,
        country,
        image
      })
      setSuccessMessage(`${data.data.name} successfully added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
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

export default AddCity

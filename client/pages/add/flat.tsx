import React, { useState } from 'react'
import axios from 'axios'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import Layout from '../../components/Layout'
import { Flat } from '../../components/Types/Flat'
import FlatForm from '../../components/Forms/FlatForm'

const AddFlat = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const sendAddFlat = async (flat: Flat) => {
    try {
      console.log("sent flat", flat)
      const data = await axios.post('http://localhost:4000/api/flats/', {
        ...flat
      })
      setSuccessMessage(`Flat on address ${data.data.address} successfully added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <GeneralContainer>
        <Heading2Centered>Add New Flat</Heading2Centered>
        <FlatForm buttonText='Add Flat' onSubmit={sendAddFlat} successMessage={successMessage}/>
      </GeneralContainer>
    </Layout>
  )
}

export default AddFlat

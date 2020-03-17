import React, { useState } from 'react'
import axios from 'axios'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import Layout from '../../components/Layout'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import NeighbourhoodForm from '../../components/Forms/NeighbourhoodForm'

const AddNeighbourhood = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const sendAddNeighbourhood = async (neighbourhood: Neighbourhood) => {
    try {
      const data = await axios.post('http://localhost:4000/api/neighbourhoods\/', {
        ...neighbourhood
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
    <Layout>
      <GeneralContainer>
        <Heading2Centered>Add New Neighbourhood</Heading2Centered>
        <NeighbourhoodForm buttonText='Add Neighbourhood' onSubmit={sendAddNeighbourhood} successMessage={successMessage}/>
      </GeneralContainer>
    </Layout>
  )
}

export default AddNeighbourhood

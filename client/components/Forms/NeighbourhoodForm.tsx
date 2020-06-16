import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { FormButton, FormContainer, FormInput, FullRow, FormSelect, FormSuccessMessage } from './StyledForm'
import { City } from '../../../Types/City'
import Spinner from '../Spinner/Spinner'

interface Props {
  buttonText: string
  onSubmit: Function
  successMessage?: string
}

const NeighbourhoodForm = ({ buttonText, onSubmit, successMessage }: Props) => {
  const [inputValues, setInputValues] = useState({
    name: '',
    city: ''
  })
  const [cities, setCities] = useState([])

  const fetchCities = async () => {
    const data = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/`)
    setCities(data.data)
  }

  useEffect(() => {
    fetchCities()
  }, [])

  const onChange = (e: ChangeEvent<any>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(inputValues)
    setInputValues({
      name: '',
      city: ''
    })
  }

  if (!cities) {
    return (
      <Spinner/>
    )
  }

  return (
    <form onSubmit={onSubmitForm}>
      <FormContainer>
        <FullRow>
          <FormInput type='text' full={true} name='name' placeholder='Neighbourhood Name' value={inputValues.name} onChange={onChange} required/>
        </FullRow>
        <FullRow>
          <FormSelect name='city' value={inputValues.city} onChange={onChange}>
            <option value=''>Select city..</option>
            {cities.map((city: City) =>
              <option value={city._id} key={city._id}>{city.name}</option>
            )}
          </FormSelect>
        </FullRow>
        <FormButton type='submit'>{buttonText}</FormButton>
        {
          successMessage && <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        }
      </FormContainer>
    </form>
  )
}

export default NeighbourhoodForm

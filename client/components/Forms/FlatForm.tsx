import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FormButton, FormContainer, FormInput, FormRow, FormSelect, FormSuccessMessage } from './StyledForm'
import Spinner from '../Spinner/Spinner'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import AuthContext from '../../context/auth/authContext'

interface Props {
  buttonText: string
  onSubmit: Function
  successMessage?: string
}

interface InputValues {
  address: string
  neighbourhood: string
  priceCZK: string
  squareMeters: string
  link: string
  agency: string
  rooms: string
  addedBy?: string
}

const FlatForm = ({ buttonText, onSubmit, successMessage }: Props) => {
  const authContext = useContext(AuthContext)

  const [inputValues, setInputValues] = useState<InputValues>({
    address: '',
    neighbourhood: '',
    priceCZK: '',
    squareMeters: '',
    link: '',
    agency: '',
    rooms: ''
  })
  const [neighbourhoods, setNeighbourhoods] = useState([])

  const fetchNeighbourhoods = async () => {
    const data = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/`)
    setNeighbourhoods(data.data)
  }

  useEffect(() => {
    fetchNeighbourhoods()
  }, [])

  const onChange = (e: ChangeEvent<any>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    if (authContext.user) {
      onSubmit({
        ...inputValues,
        addedBy: authContext.user._id
      })
    } else {
      onSubmit(inputValues)
    }

    setInputValues({
      ...inputValues, //keep the user if there is one
      address: '',
      neighbourhood: '',
      priceCZK: '',
      squareMeters: '',
      link: '',
      agency: '',
      rooms: ''
    })
  }

  if (neighbourhoods.length < 1) {
    return (
      <Spinner/>
    )
  }

  if (neighbourhoods) {
    return (
      <form onSubmit={onSubmitForm}>
        <FormContainer>
          <FormRow>
            <FormInput type='text' full={true} name='address' placeholder='Flat Address' value={inputValues.address} onChange={onChange} required/>
          </FormRow>
          <FormRow>
            <FormInput type='number' name='priceCZK' placeholder='Price in CZK' value={inputValues.priceCZK} onChange={onChange} required/>
            <FormInput type='number' last={true} name='squareMeters' placeholder='m2' value={inputValues.squareMeters} onChange={onChange} required/>
          </FormRow>
          {
            inputValues.priceCZK && inputValues.squareMeters.length > 1 &&
            <FormRow>
              <p>{(parseInt(inputValues.priceCZK) / parseInt(inputValues.squareMeters)).toFixed(0)} CZK / m<sup>2</sup></p>
            </FormRow>
          }
          <FormRow>
            <FormInput type='text' full={true} name='link' placeholder='Link' value={inputValues.link} onChange={onChange}/>
          </FormRow>
          <FormRow>
            <FormSelect name='neighbourhood' value={inputValues.neighbourhood} onChange={onChange}>
              <option value=''>Select neighbourhood..</option>
              {neighbourhoods.map((neighbourhood: Neighbourhood) =>
                <option value={neighbourhood._id} key={neighbourhood._id}>{neighbourhood.city.name} - {neighbourhood.name}</option>)}
            </FormSelect>
          </FormRow>
          <FormRow>
            <FormInput type='text' full={true} name='agency' placeholder='Real Estate Agency' value={inputValues.agency} onChange={onChange}/>
          </FormRow>
          <FormRow>
            <FormSelect name='rooms' value={inputValues.rooms} onChange={onChange}>
              <option value=''>Select dispositions of the flat..</option>
              <option value='1 + kk'>1 + kk</option>
              <option value='1 + 1'>1 + 1</option>
              <option value='2 + kk'>2 + kk</option>
              <option value='2 + 1'>2 + 1</option>
              <option value='3 + kk'>3 + kk</option>
              <option value='3 + 1'>3 + 1</option>
              <option value='4 + kk'>4 + kk</option>
              <option value='4 + 1'>4 + 1</option>
              <option value='5 + 1'>5 + 1</option>
              <option value='Larger than 5 + 1'>Larger than 5 + 1</option>
            </FormSelect>
          </FormRow>
          <FormButton type='submit'>{buttonText}</FormButton>
          {
            successMessage && <FormSuccessMessage>{successMessage}</FormSuccessMessage>
          }
        </FormContainer>
      </form>
    )
  }



}

export default FlatForm

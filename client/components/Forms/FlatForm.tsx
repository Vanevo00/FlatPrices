import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {
  FormButton,
  FormContainer,
  FormInput,
  FormInputLabelRequired,
  FullRow,
  FormSelect,
  FormSuccessMessage, HalfRow, FormInputError, FormInputLabel
} from './StyledForm'
import Spinner from '../Spinner/Spinner'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import { useForm } from "react-hook-form"
import Dropzone from './Dropzone'

interface Props {
  buttonText: string
  onSubmit: Function
  authContext: any
  successMessage?: string
}

const FlatForm = ({ buttonText, onSubmit, authContext, successMessage }: Props) => {
  const [inputValues, setInputValues] = useState({
    address: '',
    city: 'Select a city...',
    neighbourhood: 'Select a neighbourhood...',
    mainImage: '',
    priceCZK: 0,
    squareMeters: 0,
    link: '',
    agency: '',
    rooms: ''
  })
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [cities, setCities] = useState([])
  const [neighbourhoodsLoading, setNeighbourhoodsLoading] = useState(false)
  const [neighbourhoods, setNeighbourhoods] = useState([])
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur'
  });

  const fetchCities = async () => {
    const fetchedCities = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities`)
    setCities(fetchedCities.data)
    setCitiesLoading(false)
  }

  const fetchNeighbourhoods = async () => {
    setNeighbourhoodsLoading(true)
    setInputValues({
      ...inputValues,
      neighbourhood: 'Select a neighbourhood...'
    })
    const fetchedNeighbourhoods = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/byCity/${inputValues.city}`)
    setNeighbourhoods(fetchedNeighbourhoods.data)
    setNeighbourhoodsLoading(false)
  }

  useEffect(() => {
    console.log("inputValues", inputValues)
  },[inputValues])

  useEffect(() => {
    if (inputValues.city !== 'Select a city...') {
      fetchNeighbourhoods()
    } else {
      setNeighbourhoodsLoading(false)
    }
  }, [inputValues.city])

  useEffect(() => {
    fetchCities()
  }, [])

  const onChange = (e: ChangeEvent<any>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = (path: string) => {
    setInputValues({
      ...inputValues,
      mainImage: path
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
  }

  if (citiesLoading) {
    return (
      <Spinner/>
    )
  }

  if (cities) {
    return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormContainer>
          <HalfRow>
            <FormInputLabelRequired>Address</FormInputLabelRequired>
            <FormInput
              type='text'
              id='address'
              name='address'
              placeholder={'e.g. Seifertova 11'}
              value={inputValues.address}
              onChange={onChange}
              ref={register({
                validate: {
                  filled: () => inputValues.address.length > 2
                }
              })}
            />
            {errors.address && <FormInputError>Address must be at least 3 characters long</FormInputError>}
          </HalfRow>
          <HalfRow>
            <FormInputLabelRequired>City</FormInputLabelRequired>
            <FormSelect
              name='city'
              id='city'
              value={inputValues.city}
              onChange={onChange}
              ref={register({ validate: {
                  selected: () => inputValues.city !== 'Select a city...'
              }
              })}
            >
              <option value={'Select a city...'} disabled>Select a city...</option>
              {
                cities.map((city) => <option value={city._id} key={city._id}>{city.name}</option>)
              }
            </FormSelect>
            {errors.city && <FormInputError>Please select a city</FormInputError>}
          </HalfRow>
          {neighbourhoodsLoading && <FullRow><Spinner/></FullRow>}
          {
            !neighbourhoodsLoading && neighbourhoods.length > 0 &&
            <FullRow>
              <FormInputLabelRequired>Neighbourhood</FormInputLabelRequired>
              <FormSelect
                name='neighbourhood'
                id='neighbourhood'
                value={inputValues.neighbourhood}
                onChange={onChange}
                ref={register({ validate: {
                    selected: () => inputValues.neighbourhood !== 'Select a neighbourhood...'
                  }
                })}
              >
                <option value={'Select a neighbourhood...'} disabled>Select a neighbourhood...</option>
                {
                  neighbourhoods.map((neighbourhood) => <option value={neighbourhood._id} key={neighbourhood._id}>{neighbourhood.name}</option>)
                }
              </FormSelect>
              {errors.neighbourhood && <FormInputError>Please select a neighbourhood</FormInputError>}
            </FullRow>
          }
          {
            !neighbourhoodsLoading && neighbourhoods.length === 0 &&
              <p>No neighbourhoods found! Please select a different city or create a neighbourhood first.</p>
          }
          <FullRow>
            <FormInputLabel>Image</FormInputLabel>
            <Dropzone
              activeDragText={'Drop the image here ...'}
              emptyZoneText={'Drag \'n\' drop an image here, or click to select an image'}
              multipleFiles={false}
              callback={handleImageUpload}
              imagePreview={inputValues.mainImage}
            />
          </FullRow>
          <FullRow>
            <FormInput
              type='text'
              name='mainImage'
              placeholder={'or enter external image address here'}
              value={inputValues.mainImage}
              onChange={onChange}
            />
          </FullRow>
          <FullRow>
            <FormInput type='number' name='priceCZK' placeholder='Price in CZK' value={inputValues.priceCZK} onChange={onChange} required/>
            <FormInput type='number' last={true} name='squareMeters' placeholder='m2' value={inputValues.squareMeters} onChange={onChange} required/>
          </FullRow>
          {
            inputValues.priceCZK && inputValues.squareMeters > 1 &&
            <FullRow>
              <p>{(inputValues.priceCZK / inputValues.squareMeters).toFixed(0)} CZK / m<sup>2</sup></p>
            </FullRow>
          }
          <FullRow>
            <FormInput type='text' full={true} name='link' placeholder='Link' value={inputValues.link} onChange={onChange}/>
          </FullRow>
          <FullRow>
            <FormInput type='text' full={true} name='agency' placeholder='Real Estate Agency' value={inputValues.agency} onChange={onChange}/>
          </FullRow>
          <FullRow>
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
          </FullRow>
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

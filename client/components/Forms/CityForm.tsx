import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormButton, FormContainer, FormInput, FormRow, FormSuccessMessage } from './StyledForm'
import Dropzone from './Dropzone'

interface Props {
  buttonText: string
  onSubmit: Function
  successMessage?: string
  city?: {
    name: string
    country: string
    srealityScraper?: string
    nextRealityScraper?: string
    remaxScraper?: string
    svobodaWilliamsScraper?: string
    realityMatScraper?: string
    idnesScraper?: string
    rentScraper?: string
    mainImageLink?: string
  }
}

const CityForm = ({ buttonText, onSubmit, successMessage, city }: Props) => {
  const [inputValues, setInputValues] = useState({
    name: city && city.name || '',
    country: city && city.country || '',
    srealityScraper: city && city.srealityScraper || '',
    nextRealityScraper: city && city.nextRealityScraper || '',
    remaxScraper: city && city.remaxScraper || '',
    svobodaWilliamsScraper: city && city.svobodaWilliamsScraper || '',
    realityMatScraper: city && city.realityMatScraper || '',
    idnesScraper: city && city.idnesScraper || '',
    rentScraper: city && city.rentScraper || '',
    externalImageLink: city && city.mainImageLink || ''
  })
  const [image, setImage] = useState()

  const saveImageToState = (imageFile) => {
    setImage(imageFile[0])
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: inputValues.name,
      country: inputValues.country,
      srealityScraper: inputValues.srealityScraper,
      nextRealityScraper: inputValues.nextRealityScraper,
      remaxScraper: inputValues.remaxScraper,
      svobodaWilliamsScraper: inputValues.svobodaWilliamsScraper,
      realityMatScraper: inputValues.realityMatScraper,
      idnesScraper: inputValues.idnesScraper,
      rentScraper: inputValues.rentScraper,
      externalImageLink: inputValues.externalImageLink,
      image
    })
  }

  return (
    <form onSubmit={onSubmitForm} encType="multipart/form-data">
      <FormContainer>
        <FormRow>
          <FormInput type='text' full={true} name='name' placeholder='City Name' value={inputValues.name} onChange={onChange} required/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='country' placeholder='Country' value={inputValues.country} onChange={onChange} required/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='srealityScraper' placeholder='Sreality search link' value={inputValues.srealityScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='nextRealityScraper' placeholder='Next Reality search link' value={inputValues.nextRealityScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='remaxScraper' placeholder='Remax search link' value={inputValues.remaxScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='svobodaWilliamsScraper' placeholder='Svoboda & Williams search link' value={inputValues.svobodaWilliamsScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='realityMatScraper' placeholder='Realitymat search link' value={inputValues.realityMatScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='idnesScraper' placeholder='Reality Idnes search link' value={inputValues.idnesScraper} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='rentScraper' placeholder='Rents (Sreality) search link' value={inputValues.rentScraper} onChange={onChange}/>
        </FormRow>
        City image (optional):
        <FormRow>
          <Dropzone
            activeDragText={'Drop the image here ...'}
            emptyZoneText={'Drag \'n\' drop an image here, or click to select an image'}
            multipleFiles={false}
            callback={saveImageToState}
          />
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='externalImageLink' placeholder='or insert image url' value={inputValues.externalImageLink} onChange={onChange}/>
        </FormRow>
        <FormButton type='submit'>{buttonText}</FormButton>
        {
          successMessage && <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        }
      </FormContainer>
    </form>
  )
}

export default CityForm

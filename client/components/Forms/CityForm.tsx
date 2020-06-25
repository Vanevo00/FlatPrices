import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormButton, FormContainer, FormInput, FullRow, FormSuccessMessage } from './StyledForm'
import Dropzone from './Dropzone'
import ExternalImageUpload from './ExternalImageUpload'

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
    rentScraper: city && city.rentScraper || ''
  })
  const [mainImageLink, setMainImageLink] = useState<string>(city?.mainImageLink || undefined)

  const handleImageUpload = (path: string) => {
    setMainImageLink(path)
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
      ...inputValues,
      mainImageLink
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
      <FormContainer>
        <FullRow>
          <FormInput type='text' full={true} name='name' placeholder='City Name' value={inputValues.name} onChange={onChange} required/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='country' placeholder='Country' value={inputValues.country} onChange={onChange} required/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='srealityScraper' placeholder='Sreality search link' value={inputValues.srealityScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='nextRealityScraper' placeholder='Next Reality search link' value={inputValues.nextRealityScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='remaxScraper' placeholder='Remax search link' value={inputValues.remaxScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='svobodaWilliamsScraper' placeholder='Svoboda & Williams search link' value={inputValues.svobodaWilliamsScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='realityMatScraper' placeholder='Realitymat search link' value={inputValues.realityMatScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='idnesScraper' placeholder='Reality Idnes search link' value={inputValues.idnesScraper} onChange={onChange}/>
        </FullRow>
        <FullRow>
          <FormInput type='text' full={true} name='rentScraper' placeholder='Rents (Sreality) search link' value={inputValues.rentScraper} onChange={onChange}/>
        </FullRow>
        City image (optional):
        <FullRow>
          <Dropzone
            activeDragText={'Drop the image here ...'}
            emptyZoneText={'Drag \'n\' drop an image here, or click to select an image'}
            multipleFiles={false}
            callback={handleImageUpload}
            imagePreview={mainImageLink}
          />
        </FullRow>
        <FullRow>
          <ExternalImageUpload callback={handleImageUpload}/>
        </FullRow>
        <FormButton onClick={onSubmitForm}>{buttonText}</FormButton>
        {
          successMessage && <FormSuccessMessage>{successMessage}</FormSuccessMessage>
        }
      </FormContainer>
    </form>
  )
}

export default CityForm

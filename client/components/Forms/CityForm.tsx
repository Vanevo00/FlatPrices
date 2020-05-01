import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormButton, FormContainer, FormInput, FormRow, FormSuccessMessage } from './StyledForm'
import Dropzone from './Dropzone'

interface Props {
  buttonText: string
  onSubmit: Function
  successMessage?: string
}

const CityForm = ({ buttonText, onSubmit, successMessage }: Props) => {
  const [inputValues, setInputValues] = useState({
    name: '',
    country: '',
    externalImageLink: ''
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
    onSubmit(inputValues.name, inputValues.country, inputValues.externalImageLink, image)
    setInputValues({
      name: '',
      country: '',
      externalImageLink: ''
    })
    setImage(undefined)
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

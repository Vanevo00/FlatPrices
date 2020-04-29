import React, { ChangeEvent, FormEvent, useState } from 'react'
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
    image: null
  })

  const saveImageToState = (imageFile) => {
    setInputValues({
      ...inputValues,
      image: imageFile
    })
  }

  console.log('inputValues', inputValues)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    console.log(e.currentTarget)
    onSubmit(inputValues.name, inputValues.country, inputValues.image)
    setInputValues({
      name: '',
      country: '',
      image: null
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
          <Dropzone
            activeDragText={'Drop the image here ...'}
            emptyZoneText={'Drag \'n\' drop an image here, or click to select an image'}
            multipleFiles={false}
            name={'image'}
            callback={saveImageToState}
          />
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

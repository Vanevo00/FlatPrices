import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FormButton, FormContainer, FormInput, FormRow, FormSuccessMessage } from './StyledForm'

interface Props {
  buttonText: string
  onSubmit: Function
  successMessage?: string
}

const CityForm = ({ buttonText, onSubmit, successMessage }: Props) => {
  const [inputValues, setInputValues] = useState({
    name: '',
    country: ''
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(inputValues.name, inputValues.country)
    setInputValues({
      name: '',
      country: ''
    })
  }

  return (
    <form onSubmit={onSubmitForm}>
      <FormContainer>
        <FormRow>
          <FormInput type='text' full={true} name='name' placeholder='City Name' value={inputValues.name} onChange={onChange}/>
        </FormRow>
        <FormRow>
          <FormInput type='text' full={true} name='country' placeholder='Country' value={inputValues.country} onChange={onChange}/>
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

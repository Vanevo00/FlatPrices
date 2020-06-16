import Router from 'next/router'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { FormButton, FormContainer, FormInput, FormRow, FormErrorMessage } from './StyledForm'
import AuthContext from '../../context/auth/authContext'

const LoginForm = () => {
  const authContext = useContext(AuthContext)
  const [inputValues, setInputValues] = useState({
    emailOrUsername: '',
    password: ''
  })

  useEffect(() => {
    if(authContext.user) {
      Router.push('/')
    }
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    authContext.login({
      emailOrUsername: inputValues.emailOrUsername,
      password: inputValues.password
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <FormContainer>
        <FormRow>
          <FormInput type='text' full={true} name='emailOrUsername' placeholder='email or username' value={inputValues.emailOrUsername} onChange={onChange} required/>
        </FormRow>
        <FormRow>
          <FormInput type='password' full={true} name='password' placeholder='password' value={inputValues.password} onChange={onChange} required/>
        </FormRow>
        <FormButton type='submit'>Login</FormButton>
        {
          authContext.error && <FormErrorMessage>{authContext.error}</FormErrorMessage>
        }
      </FormContainer>
    </form>
  )
}

export default LoginForm

import React from 'react'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import LoginForm from '../../components/Forms/LoginForm'
import Title from '../../components/Title'

const Login = () => {

  return (
    <>
      <Title text='Login'/>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <LoginForm/>
      </GeneralContainer>
    </>
  )
}

export default Login

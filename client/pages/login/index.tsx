import React from 'react'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {

  return (
    <>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <LoginForm/>
      </GeneralContainer>
    </>
  )
}

export default Login

import React from 'react'
import { Heading2Centered } from '../../components/StyledHeadings'
import RegisterForm from '../../components/Forms/RegisterForm'
import { GeneralContainer } from '../../components/StyledContainers'

const Register = () => {
  return (
    <>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <RegisterForm/>
      </GeneralContainer>
    </>
  )
}

export default Register

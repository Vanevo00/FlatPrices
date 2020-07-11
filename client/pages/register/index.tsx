import React from 'react'
import { Heading2Centered } from '../../components/StyledHeadings'
import RegisterForm from '../../components/Forms/RegisterForm'
import { GeneralContainer } from '../../components/StyledContainers'
import Title from '../../components/Title'

const Register = () => {
  return (
    <>
      <Title text='Registration'/>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <RegisterForm/>
      </GeneralContainer>
    </>
  )
}

export default Register

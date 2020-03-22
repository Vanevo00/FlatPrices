import React from 'react'
import Layout from '../../components/Layout'
import { Heading2Centered } from '../../components/StyledHeadings'
import RegisterForm from '../../components/Forms/RegisterForm'
import { GeneralContainer } from '../../components/StyledContainers'

const Register = () => {
  return (
    <Layout>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <RegisterForm/>
      </GeneralContainer>
    </Layout>
  )
}

export default Register

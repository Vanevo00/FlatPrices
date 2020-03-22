import React from 'react'
import Layout from '../../components/Layout'
import { GeneralContainer } from '../../components/StyledContainers'
import { Heading2Centered } from '../../components/StyledHeadings'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {

  return (
    <Layout>
      <GeneralContainer>
        <Heading2Centered>Login</Heading2Centered>
        <LoginForm/>
      </GeneralContainer>
    </Layout>
  )
}

export default Login

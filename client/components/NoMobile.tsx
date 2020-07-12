import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  font-size: ${props => props.theme.fontSizes.m};
  text-align: justify;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  
  @media only screen and (min-width: 800px) {
    display: none;
  }
`

const NoMobile = () => {
  return (
    <Container>
      Welcome to Flat Prices app. This is an internal application that is not optimised for mobile devices. Please switch to a device with a minimum width of 800px.
    </Container>
  )
}

export default NoMobile

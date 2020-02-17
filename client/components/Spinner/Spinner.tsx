import React from 'react'
import styled, { keyframes } from 'styled-components'

const stretchdelay = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
  }
`

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Rect1 = styled.div``

const Rect2 = styled.div``

const Rect3 = styled.div``

const Rect4 = styled.div``

const Rect5 = styled.div``

const SpinnerElement = styled.div`
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
  
  & > div {
    background-color: ${props => props.theme.colors.main};
    margin-right: 1px;
    height: 100%;
    width: 6px;
    display: inline-block;
    
    animation: ${stretchdelay} 1.2s infinite ease-in-out;
  }
  
  ${Rect2} {
      animation-delay: -1.1s;
  }
  
  ${Rect3} {
      animation-delay: -1s;
  }
  
  ${Rect4} {
      animation-delay: -0.9s;
  }
  
  ${Rect5} {
      animation-delay: -0.8s;
  }
`

const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerElement>
        <Rect1/>
        <Rect2/>
        <Rect3/>
        <Rect4/>
        <Rect5/>
      </SpinnerElement>
    </SpinnerContainer>
  )
}

export default Spinner

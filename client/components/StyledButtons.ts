import styled from 'styled-components'

export const Button = styled.button`
`

export const EditButton = styled.button`
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  border: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 4;
`

import styled from 'styled-components'

interface Props {
  full?: boolean
}

export const FormContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  border: solid 2px ${props => props.theme.colors.main};
  border-radius: 4px;
  min-height: 100px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
`

export const FormRow = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

export const FormInput = styled.input<Props>`
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  width: ${props => props.full ? '100%' : '45%'};
  margin-right: ${props => props.full ? '0' : '1rem'};
  font-size: ${props => props.theme.fontSizes.s};
  color: ${props => props.theme.colors.main};
  
  &::placeholder {
    font-size: ${props => props.theme.fontSizes.s};
  }
`

export const FormButton = styled.button`
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  border: none;
  width: 100%;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.s};
`

export const FormSuccessMessage = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.lightText};
  margin-top: 1rem;
  border-radius: 4px;
  
`

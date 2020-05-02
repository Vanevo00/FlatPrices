import styled from 'styled-components'

interface Props {
  full?: boolean
  last?: boolean
}

interface DeleteProps {
  show: boolean
}

interface ConfirmationProps {
  show: boolean
  showConfirm: boolean
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
  color: ${props => props.theme.colors.main};
  
  input:focus {
    outline: none;
  }
`

export const FormInput = styled.input<Props>`
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  width: ${props => props.full ? '100%' : '48%'};
  margin-right: ${props => props.full ? '0' : props.last ? '0' : '1rem'};
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
  
  &:focus {
    outline: 0;
  }
`

export const FormSuccessMessage = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.successBackground};
  color: ${props => props.theme.colors.successText}; 
  border: 1px solid transparent;
  margin-top: 1rem;
  border-radius: 4px;
`

export const FormErrorMessage = styled(FormSuccessMessage)`
  background-color: ${props => props.theme.colors.errorBackground};
  color: ${props => props.theme.colors.errorText};
`

export const FormSelect = styled.select`
  width: 100%;
  height: 30px;
  font-size: ${props => props.theme.fontSizes.s};
  color: ${props => props.theme.colors.main};
`

export const DragNDrop = styled.div`
  height: 100px;
  border: 1px dashed ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const DeleteButtonContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: 1rem;
`

export const StyledDeleteButton = styled(FormButton)`
  background-color: ${props => props.theme.colors.danger};
  position: relative
`

export const DeleteText = styled.p<DeleteProps>`
  opacity: ${props => props.show ? 1 : 0};
  transition: .4s;
`

export const ConfirmDeleteIcons = styled.div<ConfirmationProps>`
  position: absolute;
  right: 1rem;
  top: 20%;
  display: ${props => props.showConfirm ? 'block' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transition: .4s;
  
  i {
    margin-right: .5rem;
  }
`

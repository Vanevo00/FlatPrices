import styled from 'styled-components'

interface Props {
  active?: boolean
}

export const PaginatorContainer = styled.div`
  width: 100%;
  display: flex;
`

export const PaginatorItem = styled.div`
  min-width: 20px;
  height: 20px;
  padding: .2rem;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const PaginatorItemWhite = styled(PaginatorItem)<Props>`
  background-color: ${props => props.active ? props.theme.colors.main : props.theme.colors.lightText};
  color: ${props => props.active ? props.theme.colors.lightText : props.theme.colors.main};
  transition: .4s;
  
  &:hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.lightText};
  }
`

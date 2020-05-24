import styled from 'styled-components'
import { Button } from '../StyledButtons'

interface SearchPeriodProps {
  last?: boolean
  active: boolean
}

export const FilterContainer = styled.div`
  width: 500px;
  border: solid 1px ${props => props.theme.colors.main};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.main};
`

export const IndividualFilters = styled.div`
  display: flex;
  flex-direction: column;
  
  input {
    margin: 0 .5rem;
    font-family: 'Roboto', sans-serif;
    color: ${props => props.theme.colors.main}; 
  }
`

export const FilterRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
`

export const FilterDescription = styled.p`
  width: 20%;
  margin-right: 5%;
`

export const FilterInteraction = styled.div`
  width: 75%;
`

export const SearchPeriod = styled.div`
  display: flex;
`

export const SearchPeriodItem = styled.button<SearchPeriodProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 100px;
  font-weight: bold;
  border: solid 1px ${props => props.theme.colors.main};
  border-right: ${props => props.last ? `solid 1px ${props => props.theme.colors.main}` : 'none'};
  color: ${props => props.active ? props.theme.colors.lightText : props.theme.colors.main};
  background-color: ${props => props.active ? props.theme.colors.main : props.theme.colors.lightText};
  cursor: pointer;
  
  &:focus {
    outline: 0;
  }
`

export const MinMaxInputs = styled.div`
  width: 100%;
`

export const FilterButton = styled(Button)`
  margin-top: 1rem;
  align-self: center;
`

import styled from 'styled-components'
import { Button } from '../StyledButtons'

interface SearchPeriodProps {
  last?: boolean
  active: boolean
}

interface FilterContainerProps {
  expanded: boolean
}

interface ShowFiltersButtonProps {
  visible: boolean
}

export const FilterContainer = styled.div<FilterContainerProps>`
  width: ${props => props.expanded ? '100%' : '120px'};
  height: ${props => props.expanded ? '400px' : '40px'};
  position: relative;
  border: solid 1px ${props => props.theme.colors.main};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.main};
  transition: .6s;
  overflow: hidden;
`

export const ShowFiltersButton = styled.button<ShowFiltersButtonProps>`
  position: absolute;
  left: 0;
  top: 0;
  border: none;
  width: 120px;
  height: 40px;
  color: ${props => props.theme.colors.main};
  font-size: ${props => props.theme.fontSizes.s};
  cursor: pointer;
  transition: .6s;
  opacity: ${props => props.visible ? '1' : '0'};
  
  &:focus {
    outline: none;
  }
`

export const CloseFiltersButton = styled.button<ShowFiltersButtonProps>`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  font-size: ${props => props.theme.fontSizes.s};
  border: none;
  cursor: pointer;
  display: ${props => props.visible ? 'block' : 'none'};
  
  &:focus {
    outline: none;
  }
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

export const ButtonList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ButtonListItem = styled.button<SearchPeriodProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  width: 120px;
  font-weight: bold;
  border: solid 1px ${props => props.theme.colors.main};
  margin-left: -1px;
  margin-top: -1px;
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

export const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
`

export const FilterButton = styled(Button)`
  margin-top: 1rem;
  align-self: center;
  margin-right: 1rem;
`

import styled from 'styled-components'

export const CityContainer = styled.div`
  width: 60%;
  margin: 2rem auto;
`

export const CityItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  border: solid 1px ${props => props.theme.colors.main};
`

export const CityRow = styled.div`
 width: 100%;
 background-color: ${props => props.theme.colors.main};
 color: ${props => props.theme.colors.lightText};
 padding: .5rem;
 cursor: pointer;
 text-align: center;
 
 &:hover {
  text-decoration: underline;
 }
`

export const NeighbourhoodRow = styled.div`
  width: 50%;
  padding: .5rem;
  cursor: pointer;
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.main};
  transition: .3s;
  
  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.lightText};
 }
`

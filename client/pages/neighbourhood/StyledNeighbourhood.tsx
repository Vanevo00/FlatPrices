import styled from 'styled-components'

export const NeighbourhoodContainer = styled.div`
  padding: 1rem;
`

export const AvgPriceTable = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  border: solid 1px ${props => props.theme.colors.main};
`

export const PriceDescription = styled.div`
  width: 50%;
  padding: .5rem;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  border-bottom: solid 1px ${props => props.theme.colors.lightText};
`

export const PriceNumber = styled.div`
  width: 50%;
  padding: .5rem;
  border-bottom: solid 1px ${props => props.theme.colors.main};
`

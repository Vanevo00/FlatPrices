import styled from 'styled-components'

export const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`

export const ResultsTable = styled.div`
  width: 30%;
  min-height: 90px;
  border: solid 2px ${props => props.theme.colors.main};
  border-radius: 8px;
`

export const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ResultItem = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.main};
  padding: 0.25rem .5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.lightText};
  }
  
  div {
    width: 100%;
  }
`

export const GreySmallText = styled.span`
  color: ${props => props.theme.colors.lightGray};
  font-size: ${props => props.theme.fontSizes.xs};
`

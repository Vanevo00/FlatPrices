import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 385px;
  display: flex;
  flex-direction: column;
`

export const SearchContainer = styled.div`
  height: 30px;
  display: flex;
  position: relative;
`

export const ResultsContainer = styled.div`
  width: 385px;
  min-height: 30px;
  background-color: ${props => props.theme.colors.mainBackground};
  border: solid 1px ${props => props.theme.colors.lighGray};
  position: absolute;
  top: 50px;
  z-index: 2;
  color: ${props => props.theme.colors.main};
`

export const StyledInput = styled.input`
  height: 100%;
  width: 350px;
  font-size: ${props => props.theme.fontSizes.xs};
  padding-left: .5rem;
  border: none;
`

export const SearchButton = styled.button`
  background-color: ${props => props.theme.colors.mainBackground};
  color: ${props => props.theme.colors.main};
  border: none;
  cursor: pointer;
`

export const NoResult = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ResultItem = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.colors.lighGray};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.lighGray};
  }
`

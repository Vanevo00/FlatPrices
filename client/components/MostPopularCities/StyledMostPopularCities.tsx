import styled from 'styled-components'

interface Props {
  backgroundImage?: string
}

export const CityListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-wrap: wrap;
  width: 90%;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const CityListItem = styled.div<Props>`
  min-width: 200px;
  max-width: 200px;
  height: 250px;
  margin-bottom: 1rem;
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-size: cover;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
`

export const ItemDescription = styled.div`
  height: 30%;
  width: 100%;
  opacity: .9;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export const NameText = styled.p`
  text-align: center;
  width: 100%;
`

export const CountryText = styled(NameText)`
  font-size: ${props => props.theme.fontSizes.xs};
`

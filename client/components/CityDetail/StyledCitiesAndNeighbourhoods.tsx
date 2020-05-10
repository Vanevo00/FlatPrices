import styled from 'styled-components'

interface SearchPeriodProps {
  last?: boolean
  active: boolean
}

interface CityImageProps {
  backgroundImage: string
}

interface CityImageDescriptionProps {
  expanded: boolean
}

interface CityImageLinksProps {
  show: boolean
  opaque: boolean
}

export const CityContainer = styled.div`
  width: 75%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const CityItemContainer = styled.div`
  width: 49%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  cursor: pointer;
`

export const CityImage = styled.div<CityImageProps>`
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`

export const CityImageDescription = styled.div<CityImageDescriptionProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  opacity: .9;
  padding: .25rem;
  font-size: ${props => props.theme.fontSizes.m};
  height: ${props => props.expanded ? '100%' : '46px'};
  padding-top: 11px;
  transition: .5s;
  position: relative;
  overflow: scroll;
  
  p {
    padding-bottom: .5rem;
  }
`

export const CloseButton = styled.button<CityImageLinksProps>`
  position: absolute;
  right: 0;
  top: 0;
  padding: .5rem;
  padding-right: 1rem;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  font-size: ${props => props.theme.fontSizes.m};
  display: ${props => props.show ? 'flex' : 'none'};
  opacity: ${props => props.opaque ? 0 : 1};
  transition: .4s;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  
  &:focus {
    outline: 0;
  }
`

export const CityImageLinks = styled.div<CityImageLinksProps>`
  display: ${props => props.show ? 'flex' : 'none'};
  opacity: ${props => props.opaque ? 0 : 1};
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  transition: .4s;
`

export const OptionRow = styled.button<CityImageLinksProps>`
  display: ${props => props.show ? 'block' : 'none'};
  opacity: ${props => props.opaque ? 0 : 1};
  transition: .4s;
  border: none;
  height: 50%;
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  font-size: ${props => props.theme.fontSizes.m};
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background-color: ${props => props.theme.colors.mainLighter};
  }
  
  &:focus {
    outline: 0;
  }
`

export const CityRow = styled.a<CityImageLinksProps>`
  display: ${props => props.show ? 'block' : 'none'};
  opacity: ${props => props.opaque ? 0 : 1};
  transition: .4s;
  width: 100%;
  color: ${props => props.theme.colors.lightText};
  padding: .5rem;
  text-align: center;
  border-top: solid 1px ${props => props.theme.colors.lightText};
 
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

export const CityTableHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`

export const SearchPeriod = styled.div`
  display: flex;
  position: absolute;
  left: 0;
`

export const SearchPeriodItem = styled.button<SearchPeriodProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 60px;
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

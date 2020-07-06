import styled from 'styled-components'
import { Heading1 } from '../StyledHeadings'

interface MainImageProps {
  source: string
}

interface RowProps {
  last?: boolean
}

interface PriceDescriptionProps {
  loading: boolean
}

export const FlatHeading = styled(Heading1)`
  width: 100%;
`

export const ListingLink = styled.a`
  color: ${props => props.theme.colors.main};
`

export const LeftSide = styled.div`
  width: 40%;
  margin-bottom: 1rem;
`

export const RightSide = styled.div`
  width: 60%;
  margin-bottom: 1rem;
`

export const MainImage = styled.div<MainImageProps>`
  width: 100%;
  height: 303px;
  background-image: url(${props => props.source});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const FlatInfoContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  border: solid 1px ${props => props.theme.colors.main};
`

export const Row = styled.div`
  display: flex;
`

export const Description = styled.div<RowProps>`
  width: 30%;
  height: 30px;
  padding-left: 1rem;
  border-bottom: solid 1px ${props => props.last ? props.theme.colors.main : props.theme.colors.lightText};
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  align-items: center;
`

export const Data = styled.div<RowProps>`
  width: 70%;
  height: 30px;
  padding-left: 1rem;
  border-bottom: solid 1px ${props => props.last ? props.theme.colors.lightText : props.theme.colors.main};
  background-color: ${props => props.theme.colors.lightText};
  color: ${props => props.theme.colors.main};
  display: flex;
  align-items: center;
`

export const DescriptionContainer = styled.div`
  width: 100%;
  border: solid 1px ${props => props.theme.colors.main};
  border-radius: 4px;
`

export const DescriptionHeader = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  padding: 1rem;
  font-size: ${props => props.theme.fontSizes.m};
`

export const DescriptionBody = styled.div<PriceDescriptionProps>`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.loading ? 'center' : 'flex-start'};
  align-items: ${props => props.loading ? 'center' : 'flex-start'};
  font-size: ${props => props.loading ? props.theme.fontSizes.m : props.theme.fontSizes.s};
  color: ${props => props.theme.colors.main};
`

interface DescriptionTextProps {
  marginTop?: number
}

export const DescriptionText = styled.p<DescriptionTextProps>`
  text-align: justify;
  margin-top: ${props => props.marginTop ? props.marginTop + 'rem' : 0};
`

export const DescriptionHalfRow = styled.div`
  width: 45%;
  display: flex;
  border-bottom: solid 1px ${props => props.theme.colors.lightGray};
  padding: .5rem 0;
`

export const RentDescriptionText = styled(DescriptionText)`
  margin-top: 1rem;
`

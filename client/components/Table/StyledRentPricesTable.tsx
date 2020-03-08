import styled from 'styled-components'
import { StyledAvgPriceTable } from './StyledAveragePriceTable'

interface HeaderProps {
  width: number
  last?: boolean
  verticalLast?: boolean
}

export const StyledRentsContainer = styled(StyledAvgPriceTable)`
  width: 700px;
`

export const Row = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`

export const HeaderItem = styled.div<HeaderProps>`
  width: ${props => props.width}%;
  border-right: ${props => props.last ? 'none' : 'solid 1px' + props.theme.colors.lightText}; 
  border-bottom: ${props => props.verticalLast ? 'none' : 'solid 1px' + props.theme.colors.lightText};
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NormalItem = styled(HeaderItem)`
  background-color: ${props => props.theme.colors.lightText};
  color: ${props => props.theme.colors.main};
  border-color: ${props => props.theme.colors.main};
`

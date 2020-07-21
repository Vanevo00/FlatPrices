import styled from 'styled-components'

interface TableItemProps {
  width: number
  last?: boolean
}

interface ConfirmDeleteProps {
  selected?: boolean
}

export const TableContainer = styled.div`
  margin: 0 auto 1rem auto;
  width: 90%;
  min-height: 120px;
  border: solid 2px ${props => props.theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`

export const TableContainerFull = styled(TableContainer)`
  width: 100%;
`

export const TableRow = styled.div<{ last?: boolean }>`
  width: 100%;
  min-height: 40px;
  display: flex;
  border-bottom: ${props => props.last ? 'none' : `solid 1px ${props.theme.colors.main}`};
`

export const TableRowHeader = styled(TableRow)`
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
`

export const TableItem = styled.div<TableItemProps>`
  width: ${props => `${props.width}%`};
  border-right: ${props => props.last ? 'none' : `solid 1px ${props.theme.colors.main}`};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`

export const TableItemHeader = styled(TableItem)`
  border-right: ${props => props.last ? 'none' : `solid 1px ${props.theme.colors.lightText}`};
`

export const TableItemButton = styled(TableItem)`
  cursor: pointer;
  transition: .3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.lightText};
  }
  
  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const TableItemDeleteButton = styled(TableItemButton)`
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.danger};
  }
`

export const ConfirmDeleteContainer = styled.div<ConfirmDeleteProps>`
  background-color: ${props => props.theme.colors.formBackground};
  color: ${props => props.theme.colors.mainText};
  display: flex;
  transition: .5s;
  border-left: solid 1px ${props => props.theme.colors.mainText};
  padding: 0 .5rem;
  position: absolute;
  right: 100%;
  top: 0;
  width: 270px;
  opacity: ${props => props.selected ? '1' : '0'};
  z-index: ${props => props.selected ? '2' : '-1'};
  align-items: center;
  height: 100%;
  box-shadow: 0 2px 16px rgba(45, 45, 45, 0.188374);
`

export const ConfirmButton = styled.button`
  color: ${props => props.theme.colors.lightText};
  background-color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.fontSizes.xs};
  padding: .25rem;
  margin-left: .5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const StyledLink = styled.a`
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ArrowUp = styled.i`
  color: ${props => props.theme.colors.danger};
  position: absolute;
  left: 0.8rem;
`

export const ArrowDown = styled.i`
  color: ${props => props.theme.colors.successText};
  position: absolute;
  left: 0.8rem;
`

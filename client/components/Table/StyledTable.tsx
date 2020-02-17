import styled from 'styled-components'

interface TableItemProps {
  width: number
  last?: boolean
}

export const TableContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  min-height: 120px;
  border: solid 2px ${props => props.theme.colors.main};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`

export const TableRow = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  border-bottom: solid 1px ${props => props.theme.colors.main};
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
`

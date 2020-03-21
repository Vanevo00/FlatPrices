import styled from 'styled-components'

interface Props {
  expanded?: boolean
  delay?: number
}

export const NavbarContainer = styled.div`
  width: 100%;
  min-height: 70px;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: relative;
`
export const NavLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  padding: .5rem;
  border: solid 1px ${props => props.theme.colors.main};
  
  &:hover {
    border-color: ${props => props.theme.colors.mainBackground};
  }
`

export const UserPanelContainer = styled.div`
  display: flex;
  align-items: center;
`

export const AddNewButton = styled.div`
  cursor: pointer;
  padding: .5rem;
  border: solid 1px ${props => props.theme.colors.main};
  position: relative;
  
  &:hover {
    border-color: ${props => props.theme.colors.mainBackground};
  }
`

export const NavItemContainer = styled.div`
  position: absolute;
  top: 70px;
  height: 70px;
  width: 140px;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NavItem = styled.a<Props>`
  height: 40px;
  width: 40px;
  opacity: ${props => props.expanded ? '1' : '0'};
  border-radius: 50%;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .4s;
  transition-delay: .${props => props.delay}s;
`

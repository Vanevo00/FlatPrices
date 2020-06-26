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

export const NavbarButton = styled.div`
  cursor: pointer;
  padding: .5rem;
  border: solid 1px ${props => props.theme.colors.main};
  position: relative;
  
  &:hover {
    border-color: ${props => props.theme.colors.mainBackground};
  }
  
  i {
    margin-right: 5px;
  }
`

export const UserMenuContainer = styled.div`
  position: fixed;
  right: 0;
  top: 70px;
  background-color: black;
  width: 120px;
`

export const UserMenuItem = styled.div<Props>`
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  border: solid 1px ${props => props.theme.colors.lightText};
  position: absolute;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: ${props => props.expanded ? '0' : '-120px'};
  transition: .5s;
  cursor: pointer;
`

export const NavItemsContainer = styled.div`
  position: absolute;
  top: 70px;
  height: 70px;
  width: 140px;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NavItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.colors.main};
  
  p {
    opacity: 0;
    transition: .4s;
  }
  
  &:hover {
    p {
      opacity: 1;
    }
  }
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

import styled from 'styled-components'

export const NavbarContainer = styled.div`
  width: 100%;
  min-height: 70px;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
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

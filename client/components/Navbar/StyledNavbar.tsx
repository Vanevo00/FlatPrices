import styled from 'styled-components'

export const NavbarContainer = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.lightText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`

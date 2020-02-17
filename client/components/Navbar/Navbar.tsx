import React from 'react'
import { NavbarContainer } from './StyledNavbar'
import Search from './Search'

const Navbar = () => {
  return (
    <NavbarContainer>
      <Search/>
      <div>test2</div>
      <div>test3</div>
    </NavbarContainer>
  )
}

export default Navbar

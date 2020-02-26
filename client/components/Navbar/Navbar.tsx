import React from 'react'
import Link from 'next/link'
import { NavbarContainer, NavLink } from './StyledNavbar'
import Search from './Search'

const Navbar = () => {
  return (
    <NavbarContainer>
      <div>
        <Link href='/'>
          <NavLink>Home</NavLink>
        </Link>
        <Link href='/cities'>
          <NavLink>Cities & Neighbourhoods</NavLink>
        </Link>
      </div>

      <Search/>
      <div>test3</div>
    </NavbarContainer>
  )
}

export default Navbar

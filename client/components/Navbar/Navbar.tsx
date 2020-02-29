import React from 'react'
import Link from 'next/link'
import { NavbarContainer, NavLink } from './StyledNavbar'
import Search from './Search'
import AddNew from './AddNew'

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
      <AddNew/>
    </NavbarContainer>
  )
}

export default Navbar

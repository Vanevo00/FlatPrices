import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { NavbarContainer, NavLink } from './StyledNavbar'
import Search from './Search'
import AuthContext from '../../context/auth/authContext'
import LoginOrRegister from './LoginOrRegister'
import UserPanel from './UserPanel'

const Navbar = () => {
  const authContext = useContext(AuthContext)

  const {
    loadUser,
    user
  } = authContext

  useEffect(() => {
    loadUser()
  },[])

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

      {
        user
        ? <UserPanel/>
        : <LoginOrRegister/>
      }

    </NavbarContainer>
  )
}

export default Navbar

import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { NavbarContainer, NavLink } from './StyledNavbar'
import Search from './Search'
import AddNew from './AddNew'
import AuthContext from '../../context/auth/authContext'
import LoginOrRegister from './LoginOrRegister'

const Navbar = () => {
  const authContext = useContext(AuthContext)

  const {
    // @ts-ignore
    loadUser,
    // @ts-ignore
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
        ? <AddNew/>
        : <LoginOrRegister/>
      }

    </NavbarContainer>
  )
}

export default Navbar

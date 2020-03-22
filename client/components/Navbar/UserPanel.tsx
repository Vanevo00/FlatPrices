import Link from 'next/link'
import Router from 'next/router'
import React, { useContext, useState } from 'react'
import {
  NavItemContainer,
  NavItem,
  UserPanelContainer,
  NavbarButton,
  UserMenuContainer,
  UserMenuItem
} from './StyledNavbar'
import AuthContext from '../../context/auth/authContext'

const UserPanel = () => {
  const authContext = useContext(AuthContext)

  const [showLinks, setShowLinks] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleShowLinks = () => {
    setShowUserMenu(false)
    setShowLinks(!showLinks)
  }

  const handleUserClick = () => {
    setShowLinks(false)
    setShowUserMenu(!showUserMenu)
  }

  const logoutUser = () => {
    authContext.logout()
    location.reload()
  }


  return (
    <UserPanelContainer>
      <NavbarButton onClick={handleShowLinks}>
        Add new
      </NavbarButton>
      <NavItemContainer>
        <Link href='/add/city'>
          <NavItem expanded={showLinks} delay={0}><i className="fas fa-map-marked-alt"/></NavItem>
        </Link>
        <Link href='/add/neighbourhood'>
          <NavItem expanded={showLinks} delay={2}><i className="fas fa-city"/></NavItem>
        </Link>
        <Link href='/add/flat'>
          <NavItem expanded={showLinks} delay={4}><i className="fas fa-building"/></NavItem>
        </Link>
      </NavItemContainer>
      <NavbarButton onClick={handleUserClick}>
        <i className="far fa-user-circle"/>{authContext.user.name}
      </NavbarButton>
      <UserMenuContainer>
        <UserMenuItem expanded={showUserMenu} onClick={logoutUser}>
          Logout
        </UserMenuItem>
      </UserMenuContainer>
    </UserPanelContainer>
  )
}

export default UserPanel

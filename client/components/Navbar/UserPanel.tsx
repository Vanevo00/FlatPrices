import Link from 'next/link'
import React, { useContext, useState } from 'react'
import {
  NavItemsContainer,
  NavItem,
  UserPanelContainer,
  NavbarButton,
  UserMenuContainer,
  UserMenuItem, NavItemContainer
} from './StyledNavbar'
import AuthContext from '../../context/auth/authContext'

const UserPanel = () => {
  const authContext = useContext(AuthContext)

  const [showLinksContainer, setShowLinksContainer] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleShowLinks = () => {
    if (!showLinksContainer) {
      setShowLinksContainer(true)
      setTimeout(() => {
        setShowLinks(true)
      })
    } else {
      setShowLinks(false)
      setTimeout(() => {
        setShowLinksContainer(false)
      }, 1000)
    }
    setShowUserMenu(false)
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
      {
        showLinksContainer &&
        <NavItemsContainer>
          <Link href='/add/city'>
            <NavItemContainer>
              <NavItem expanded={showLinks} delay={0}><i className="fas fa-map-marked-alt"/>
              </NavItem>
              <p>city</p>
            </NavItemContainer>
          </Link>
          <Link href='/add/neighbourhood'>
            <NavItemContainer>
              <NavItem expanded={showLinks} delay={2}><i className="fas fa-city"/></NavItem>
              <p>hood</p>
            </NavItemContainer>
          </Link>
          <Link href='/add/flat'>
            <NavItemContainer>
              <NavItem expanded={showLinks} delay={4}><i className="fas fa-building"/></NavItem>
              <p>flat</p>
            </NavItemContainer>
          </Link>
        </NavItemsContainer>
      }
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

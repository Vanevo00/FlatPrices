import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { NavItemContainer, AddNewButton, NavItem, UserPanelContainer } from './StyledNavbar'
import AuthContext from '../../context/auth/authContext'

const UserPanel = () => {
  const authContext = useContext(AuthContext)

  const [showLinks, setShowLinks] = useState(false)

  const onClick = () => {
    setShowLinks(!showLinks)
  }


  return (
    <UserPanelContainer>
      <AddNewButton onClick={onClick}>
        {authContext.user.name}
      </AddNewButton>
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
    </UserPanelContainer>
  )
}

export default UserPanel

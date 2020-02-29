import Link from 'next/link'
import React, { useState } from 'react'
import { NavItemContainer, AddNewButton, NavItem } from './StyledNavbar'

const AddNew = () => {
  const [showLinks, setShowLinks] = useState(false)

  const onClick = () => {
    setShowLinks(!showLinks)
  }

  return (
    <>
      <AddNewButton onClick={onClick}>
        Add New
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
    </>
  )
}

export default AddNew

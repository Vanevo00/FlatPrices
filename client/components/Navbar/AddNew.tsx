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
        <NavItem expanded={showLinks} delay={0}><i className="fas fa-map-marked-alt"/></NavItem>
        <NavItem expanded={showLinks} delay={2}><i className="fas fa-city"/></NavItem>
        <NavItem expanded={showLinks} delay={4}><i className="fas fa-building"/></NavItem>
      </NavItemContainer>
    </>
  )
}

export default AddNew

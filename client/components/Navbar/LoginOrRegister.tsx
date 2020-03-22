import React from 'react'
import { NavLink } from './StyledNavbar'
import Link from 'next/link'

const LoginOrRegister = () => {
  return (
    <div>
      <Link href='/login'>
        <NavLink>Login</NavLink>
      </Link>
      <Link href='/register'>
        <NavLink>Register</NavLink>
      </Link>
    </div>
  )
}

export default LoginOrRegister

import { PureComponent, useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import Router from 'next/router'

const UserRestricted = ({ children }) => {
  const authContext = useContext(AuthContext)

  if (authContext.userLoading) {
    return null
  }

  if (authContext.isAuthenticated) {
    return children
  }

  Router.push('/login')
  return null
}

export const limitToLoggedIn = (Component) => {
  return class extends PureComponent {
    static async getInitialProps (context) {
      return Component.getInitialProps ? Component.getInitialProps(context) : {}
    }

    render () {
      return (
        <UserRestricted>
          <Component {...this.props} />
        </UserRestricted>
      )
    }
  }
}

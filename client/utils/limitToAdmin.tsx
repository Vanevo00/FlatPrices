import { PureComponent, useContext } from 'react'
import AuthContext from '../context/auth/authContext'
import Router from 'next/router'

const AdminRestricted = ({ children }) => {
  const authContext = useContext(AuthContext)

  if (authContext.userLoading) {
    return null
  }

  if (authContext.user && authContext.user.isAdmin) {
    return children
  }

  return Router.push('/')
}

export const limitToAdmin = (Component) => {
  return class extends PureComponent {
    static async getInitialProps (context) {
      return Component.getInitialProps ? Component.getInitialProps(context) : {}
    }

    render () {
      return (
        <AdminRestricted>
          <Component {...this.props} />
        </AdminRestricted>
      )
    }
  }
}

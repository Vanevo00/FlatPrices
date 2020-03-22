import { createContext, Context } from 'react'

interface ContextInterface {
  token: string
  isAuthenticated: boolean
  userLoading: boolean
  user: {
    created: string
    _id: string
    name: string
    email: string
    error: string
    isAdmin: boolean
  }
  error: string
  register: Function
  login: Function
  logout: Function
  clearErrors: Function
  loadUser: Function
  setError: Function
}

const AuthContext: Context<ContextInterface> = createContext(null)

export default AuthContext

import React, { useReducer } from "react"
import AuthContext from './authContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_ERROR
} from '../types'

const AuthState = (props: any) => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    userLoading: true,
    user: null,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const loadUser = async () => {
    //the function below sets common header
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('http://localhost:4000/api/auth')

      dispatch({type: USER_LOADED, payload: res.data})
    } catch (err) {
      dispatch({type: AUTH_ERROR})
    }

  }

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:4000/api/users', formData)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth', formData)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
  }

  const logout = () => dispatch({ type: LOGOUT })

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  const setError = (msg) => dispatch({
    type: SET_ERROR,
    payload: msg
  })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userLoading: state.userLoading,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
        setError
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthState

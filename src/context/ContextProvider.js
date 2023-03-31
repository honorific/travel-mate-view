import {createContext, useContext, useEffect, useReducer} from 'react'
import reducer from './Reducer'
import cookies from '../utils/cookieUtil'

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: {open: false, severity: 'info', message: ''},
  profile: {open: false, file: null, photoURL: ''},
  images: [],
  details: {title: '', description: '', price: 0},
  location: {lng: 0, lat: 0},
  rooms: [],
}

const Context = createContext(initialState)

export const useValue = () => {
  return useContext(Context)
}

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (document.cookie.currentUser) {
      const currentUserFromCookie = cookies.get('currentUser')
      dispatch({type: 'UPDATE_USER', payload: currentUserFromCookie})
    }
  }, [])

  return (
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
  )
}

export default ContextProvider

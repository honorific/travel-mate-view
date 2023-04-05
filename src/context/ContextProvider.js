import {createContext, useContext, useEffect, useMemo, useReducer} from 'react'
import reducer from './Reducer'
import cookies from '../utils/cookieUtil'
import {useRef} from 'react'
import {getUserInfo, removeUserInfo} from '../utils/auth'

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
  priceFilter: 50,
  adddressFilter: null,
}

const Context = createContext(initialState)

export const useValue = () => {
  return useContext(Context)
}

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const mapRef = useRef()
  const containerRef = useRef()
  useMemo(() => {
    const currentUserFromCookie = getUserInfo('currentUser')
    if (currentUserFromCookie && currentUserFromCookie !== 'undefined') {
      dispatch({type: 'UPDATE_USER', payload: currentUserFromCookie})
    } else {
      if (currentUserFromCookie === 'undefined') {
        removeUserInfo('currentUser')
      }
      console.log('couldnt find user cookie')
    }
  }, [])

  return (
    <Context.Provider value={{state, dispatch, mapRef, containerRef}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider

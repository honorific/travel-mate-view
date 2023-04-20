import {
  useRef,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import reducer from './Reducer'
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
  updatedRoom: null,
  deletedImages: [],
  addedImages: [],
  rooms: [],
  priceFilter: 50,
  adddressFilter: null,
  filteredRooms: [],
  room: null,
  users: [],
  section: 0,
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
    if (currentUserFromCookie !== 'undefined') {
      dispatch({type: 'UPDATE_USER', payload: currentUserFromCookie})
    } else {
      if (currentUserFromCookie === 'undefined') {
        removeUserInfo('currentUser')
      }
      console.log('couldnt find user cookie')
    }
  }, [])

  useEffect(() => {
    if (state.currentUser) {
      const room = JSON.parse(localStorage.getItem(state.currentUser.id))
      if (room) {
        dispatch({type: 'UPDATE_LOCATION', payload: room.location})
        dispatch({type: 'UPDATE_DETAILS', payload: room.details})
        dispatch({type: 'UPDATE_IMAGES', payload: room.images})
        dispatch({type: 'UPDATE_UPDATED_ROOM', payload: room.updatedRoom})
        dispatch({type: 'UPDATE_DELETED_IMAGES', payload: room.deletedImages})
        dispatch({type: 'UPDATE_ADDED_IMAGES', payload: room.addedImages})
      }
    }
  }, [state.currentUser])

  return (
    <Context.Provider value={{state, dispatch, mapRef, containerRef}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider

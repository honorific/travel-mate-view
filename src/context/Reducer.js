import {storeUserInfo, removeUserInfo} from '../utils/auth'

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return {...state, openLogin: true}

    case 'CLOSE_LOGIN':
      return {...state, openLogin: false}

    case 'START_LOADING':
      return {...state, loading: true}

    case 'END_LOADING':
      return {...state, loading: false}

    case 'UPDATE_ALERT':
      return {...state, alert: action.payload}

    case 'UPDATE_PROFILE':
      return {...state, profile: action.payload}

    case 'UPDATE_USER':
      if (action.payload === null) {
        removeUserInfo('currentUser')
        return {...state, currentUser: action.payload}
      } else {
        storeUserInfo('currentUser', JSON.stringify(action.payload))
        return {...state, currentUser: action.payload}
      }

    case 'UPDATE_IMAGES':
      return {...state, images: [...state.images, action.payload]}

    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      }

    case 'UPDATE_DETAILS':
      return {...state, details: {...state.details, ...action.payload}}

    case 'UPDATE_LOCATION':
      return {...state, location: action.payload}

    case 'RESET_ROOM':
      return {
        ...state,
        images: [],
        details: {title: '', description: '', price: 0},
        location: {lng: 0, lat: 0},
      }

    case 'UPDATE_ROOMS':
      return {
        ...state,
        rooms: action.payload,
        addressFilter: null,
        priceFilter: 50,
        filteredRooms: action.payload,
      }

    case 'FILTER_PRICE':
      return {
        ...state,
        priceFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          state.addressFilter,
          action.payload,
        ),
      }

    case 'FILTER_ADDRESS':
      return {
        ...state,
        addressFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          action.payload,
          state.priceFilter,
        ),
      }

    case 'CLEAR_ADDRESS':
      return {
        ...state,
        addressFilter: null,
        priceFilter: 50,
        filteredRooms: state.rooms,
      }

    default:
      throw new Error("you didn't pass a proper action")
  }
}

const applyFilter = (rooms, address, price) => {
  let filteredRooms = rooms
  if (address) {
    const {lng, lat} = address
    filteredRooms = filteredRooms.filter((room) => {
      const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng
      const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat
      return lngDifference <= 1 && latDifference <= 1
    })
  }
  if (price < 50) {
    filteredRooms = filteredRooms.filter((room) => room.price <= price)
  }
  return filteredRooms
}

export default reducer

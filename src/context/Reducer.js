import {DetailsOutlined} from '@mui/icons-material'
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

    default:
      throw new Error("you didn't pass a proper action")
  }
}

export default reducer

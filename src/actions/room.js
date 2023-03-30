import {useValue} from '../context/ContextProvider'

const url = `${process.env.REACT_APP_SERVER_URL}/room`
const {
  state: {currentUser},
  dispatch,
} = useValue()

export const createRoom = async (room, currentUser, dispatch) => {}

import {useValue} from '../context/ContextProvider'
import fetchData from '../utils/fetchData'

const url = `${process.env.REACT_APP_SERVER_URL}/room`
const {
  state: {currentUser},
  dispatch,
} = useValue()

export const createRoom = async (room, currentUser, dispatch) => {
  dispatch({type: 'START_LOADING'})
  const result = await fetchData({
    url,
    body: room,
    token: currentUser?.token,
    dispatch,
  })
  if (result) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'the room created successfully',
      },
    })
  }
  dispatch({type: 'END_LOADING'})
}

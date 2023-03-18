const url = `${process.env.REACT_APP_SERVER_URL}/user`

export const register = async (user, dispatch) => {
  dispatch({type: 'START_LOADING'})
  // send request
  dispatch({type: 'END_LOADING'})
}

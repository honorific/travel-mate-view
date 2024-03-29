import {v4 as uuidv4} from 'uuid'
import uploadFile from '../firebase/uploadFile'
import fetchData from '../utils/fetchData'
import {useValue} from '../context/ContextProvider'

const url = `${process.env.REACT_APP_SERVER_URL}/user`
//const {state: currentUser} = useValue()
export const register = async (user, dispatch) => {
  dispatch({type: 'START_LOADING'})
  const result = await fetchData({url: `${url}/register`, body: user}, dispatch)
  console.log('result is: ', result)
  if (result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'CLOSE_LOGIN'})
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'your account has been created successfully',
      },
    })
  }
  dispatch({type: 'END_LOADING'})
}

export const login = async (user, dispatch) => {
  dispatch({type: 'START_LOADING'})
  const result = await fetchData({url: `${url}/login`, body: user}, dispatch)
  console.log('result is: ', result)
  if (result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'CLOSE_LOGIN'})
  }
  dispatch({type: 'END_LOADING'})
}

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({type: 'START_LOADING'})
  const {name, file} = updatedFields
  let body = {name}
  try {
    if (file) {
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop()
      console.log('filename is', imageName)
      const photoURL = await uploadFile(
        file,
        `profile/${currentUser?.id}/${imageName}`,
      )
      body = {...body, photoURL}
      console.log('body is: ', body)
    }
    console.log('body outside is: ', body)
    const result = await fetchData(
      {
        url: `${url}/updateprofile`,
        method: 'PATCH',
        body,
        token: currentUser.token,
      },
      dispatch,
    )
    if (result) {
      console.log('result is: ', result)
      dispatch({type: 'UPDATE_USER', payload: {...currentUser, ...result}})
      console.log('currentUser is: ', currentUser)
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'your profile has been updated successfully',
        },
      })
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: {open: false, file: null, photoURL: result.photoURL},
      })
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: error.message,
      },
    })
    console.log('error of update profile: ', error)
  }
  dispatch({type: 'END_LOADING'})
}

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData(
    {url, method: 'GET', token: currentUser.token},
    dispatch,
  )
  if (result) {
    dispatch({type: 'UPDATE_USERS', payload: result})
  }
}

export const updateStatus = (updatedFields, userId, dispatch, currentUser) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: 'PATCH',
      token: currentUser.token,
      body: updatedFields,
    },
    dispatch,
  )
}

export const logOut = (dispatch) => {
  dispatch({type: 'UPDATE_USER', payload: null})
  dispatch({type: 'RESET_ROOM'})
  dispatch({type: 'UPDATE_USERS', payload: []})
}

import {Google} from '@mui/icons-material'
import {Button} from '@mui/material'
import {useState} from 'react'
import {useValue} from '../../context/ContextProvider'
import jwtDecode from 'jwt-decode'

const GoogleOneTapLogin = () => {
  const [disabled, setDisabled] = useState(false)
  const {dispatch} = useValue()

  const responseHandler = (response) => {
    const token = response.credential
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    const {sub: id, email, name, picture: photoURL} = decodedToken
    dispatch({
      type: 'UPDATE_USER',
      payload: {id, email, name, photoURL, token, google: true},
    })
    dispatch({type: 'CLOSE_LOGIN'})
  }
  
  const googleLoginHandler = () => {
    setDisabled(true)
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: responseHandler,
      })
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error('try to clear cookies or try later')
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false)
        }
      })
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {open: true, severity: 'error', message: error.message},
      })
    }
  }
  return (
    <Button
      variant='outlined'
      startIcon={<Google />}
      disabled={disabled}
      onClick={googleLoginHandler}
    >
      Login with Google
    </Button>
  )
}

export default GoogleOneTapLogin

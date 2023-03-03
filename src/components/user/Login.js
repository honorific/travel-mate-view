import {Close, Send} from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import React, {useRef, useState} from 'react'
import {useValue} from '../../context/ContextProvider'
import PasswodField from './PasswodField'

const Login = () => {
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(true)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const {
    state: {openLogin},
    dispatch,
  } = useValue()

  const handleClose = () => {
    dispatch({type: 'CLOSE_LOGIN'})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  console.log(openLogin)
  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>Please fill you information</DialogContentText>
          {!isRegister && (
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Name'
              type='text'
              fullWidth
              inputRef={nameRef}
              inputProps={{minLength: 2}}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='text'
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswodField {...{passwordRef}} />
          {!isRegister && (
            <PasswodField
              {...{
                confirmPasswordRef,
                label: 'Confirm password',
                id: 'confirmPassword',
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Login

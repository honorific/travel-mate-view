import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import React, {forwardRef} from 'react'
import {useValue} from '../../context/ContextProvider'
import {Close} from '@mui/icons-material'

const Transition = forwardRef((props, ref) => {
  return <Slide direction='up' {...props} ref={ref} />
})

const Room = () => {
  const {
    state: {room},
    dispatch,
  } = useValue()

  const handleClose = () => {
    dispatch({type: 'UPDATE_ROOM', payload: null})
  }

  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' component='h3' sx={{ml: 2, flex: 1}}>
            {room?.title}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
}

export default Room

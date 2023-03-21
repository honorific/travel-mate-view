import {Close, Send} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import {useRef} from 'react'
import {useValue} from '../../context/ContextProvider'

const Profile = () => {
  const {
    state: {profile, currentUser},
    dispatch,
  } = useValue()

  const nameRef = useRef()

  const handleClose = () => {
    dispatch({type: 'UPDATE_PROFILE', payload: {...profile, open: false}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const photoURL = URL.createObjectURL(file)
      dispatch({type: 'UPDATE_PROFILE', payload: {...profile, file, photoURL}})
    }
  }
  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
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
          <DialogContentText>
            you can update your profile by filling these fields:
          </DialogContentText>
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
            defaultValue={currentUser?.name}
          />
          <label htmlFor='profilePhoto'>
            <input
              accept='image/*'
              id='profilePhoto'
              type='file'
              style={{display: 'none'}}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{height: '75px', width: '75px', cursor: 'pointer'}}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center'}}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<Send />}
            fullWidth
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Profile

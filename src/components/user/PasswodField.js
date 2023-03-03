import {Visibility, VisibilityOff} from '@mui/icons-material'
import {IconButton, InputAdornment, TextField} from '@mui/material'
import {useState} from 'react'

const PasswodField = ({passwordRef, id = 'password', label = 'Password'}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  // for keep the focus on password field
  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <TextField
      autoFocus
      margin='normal'
      variant='standard'
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      inputRef={passwordRef}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswodField

import {Mail, Notifications} from '@mui/icons-material'
import {Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material'
import {useState} from 'react'
import {useValue} from '../../context/ContextProvider'
import UserMenu from '../UserMenu'

const UserIcons = () => {
  const {
    state: {currentUser},
  } = useValue()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  return (
    <Box>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size='large' color='inherit'>
        <Badge color='error' badgeContent={16}>
          <Notifications />
        </Badge>
      </IconButton>
      <Tooltip title='open user settings'>
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      {/* {...{anchorUserMenu, setAnchorUserMenu}} */}
      <UserMenu {...{anchorUserMenu, setAnchorUserMenu}} />
    </Box>
  )
}

export default UserIcons

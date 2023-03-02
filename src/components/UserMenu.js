import {Logout, Settings} from '@mui/icons-material'
import {ListItemIcon, Menu, MenuItem} from '@mui/material'
import {useValue} from '../context/ContextProvider'

const UserMenu = (props) => {
  console.log(props)
  const {anchorUserMenu, setAnchorUserMenu} = props
  const closeHandler = () => {
    setAnchorUserMenu(null)
  }
  const {dispatch} = useValue()
  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={closeHandler}
      onClick={closeHandler}
    >
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={() => dispatch({type: 'UPDATE_USER', payload: null})}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu

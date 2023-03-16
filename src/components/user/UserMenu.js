import {Logout, Settings} from '@mui/icons-material'
import {ListItemIcon, Menu, MenuItem} from '@mui/material'
import {useValue} from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'

const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {
  useCheckToken()
  const {
    dispatch,
    state: {currentUser},
  } = useValue()

  const closeHandler = () => {
    setAnchorUserMenu(null)
  }

  const testAuth = async () => {
    console.log('token in client is: ', currentUser.token)
    const url = `${process.env.REACT_APP_SERVER_URL}/room`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${currentUser.token}s`,
        },
      })
      const data = await response.json()
      console.log('data is: ', data)
      if (!data.success) {
        if (response.status === 401) {
          dispatch({type: 'UPDATE_USER', payload: null})
        }
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {open: true, severity: 'error', message: error.message},
      })
      console.log(error)
    }
  }

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={closeHandler}
      onClick={closeHandler}
    >
      <MenuItem onClick={testAuth}>
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

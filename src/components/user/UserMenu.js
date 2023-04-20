import {Dashboard, Logout, Settings} from '@mui/icons-material'
import {ListItemIcon, Menu, MenuItem} from '@mui/material'
import {useValue} from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'
import Profile from './Profile'
import {useNavigate} from 'react-router'
import {storeRoom} from '../../actions/room'
import {logOut} from '../../actions/user'
import {useEffect} from 'react'

const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {
  useCheckToken()
  const {
    dispatch,
    state: {
      currentUser,
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
    },
  } = useValue()

  const closeHandler = () => {
    setAnchorUserMenu(null)
  }

  const handleLogOut = () => {
    storeRoom(
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser.id,
    )
    logOut(dispatch)
  }

  useEffect(() => {
    const storeBeforeLeave = (e) => {
      if (
        storeRoom(
          location,
          details,
          images,
          updatedRoom,
          deletedImages,
          addedImages,
          currentUser.id,
        )
      ) {
        e.preventDefault()
        e.returnValue = true
      }
    }
    window.addEventListener('beforeunload', storeBeforeLeave)
    return () => window.removeEventListener('beforeunload', storeBeforeLeave)
  }, [location, details, images])

  const navigate = useNavigate()

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={closeHandler}
        onClick={closeHandler}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <Dashboard fontSize='small' />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  )
}

export default UserMenu

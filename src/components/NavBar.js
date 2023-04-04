import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LockIcon from '@mui/icons-material/Lock'
import {useValue} from '../context/ContextProvider'
import UserIcons from './user/UserIcons'
import Sidebar from './sidebar/Sidebar'
import {useState} from 'react'

const Navbar = () => {
  const {
    state: {currentUser},
    dispatch,
  } = useValue()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AppBar>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{mr: 1}}>
              <IconButton
                size='large'
                color='inherit'
                onClick={() => setIsOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{
                flexGrow: 1,
                display: {xs: 'none', md: 'flex'},
              }}
            >
              You are welcome
            </Typography>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
            >
              YRW
            </Typography>
            {!currentUser ? (
              <Button
                color='inherit'
                startIcon={<LockIcon />}
                onClick={() => dispatch({type: 'OPEN_LOGIN'})}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Sidebar {...{isOpen, setIsOpen}} />
    </>
  )
}

export default Navbar

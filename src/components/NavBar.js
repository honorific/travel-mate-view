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
import {Login} from '@mui/icons-material'

const Navbar = () => {
  const {
    state: {currentUser},
    dispatch,
  } = useValue()
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{mr: 1}}>
            <IconButton size='large' color='inherit'>
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
  )
}

export default Navbar

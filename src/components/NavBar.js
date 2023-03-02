import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import photoURL from '../profile.jpg'
import MenuIcon from '@mui/icons-material/Menu'
import LockIcon from '@mui/icons-material/Lock'
import {useValue} from '../context/ContextProvider'

const Navbar = () => {
  const user = {name: 'test', photoURL}
  const {
    state: {currentUser},
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
            <Button color='inherit' startIcon={<LockIcon />}>
              Login
            </Button>
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar

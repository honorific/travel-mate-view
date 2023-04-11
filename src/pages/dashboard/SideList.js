import MuiDrawer from '@mui/material/Drawer'
import {ChevronLeft, Inbox, Logout, Mail} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useValue} from '../../context/ContextProvider'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const SideList = ({open, setOpen}) => {
  const {
    state: {currentUser},
    dispatch,
  } = useValue()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({type: 'UPDATE_USER', payload: null})
    navigate('/')
  }
  return (
    <>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{mx: 'auto', mt: 3, mb: 1}}>
          <Tooltip title={currentUser?.name || ''}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && {sx: {height: 100, width: 100}})}
            />
          </Tooltip>
        </Box>
        <Box sx={{textAlign: 'center'}}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant='body2'>{currentUser?.role || 'Role'}</Typography>
          {open && (
            <Typography variant='body2'>{currentUser?.email}</Typography>
          )}
          <Tooltip title='Logout' sx={{mt: 2}}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader />
      </Box>
    </>
  )
}

export default SideList

import MuiDrawer from '@mui/material/Drawer'
import {
  ChevronLeft,
  Dashboard,
  KingBed,
  Logout,
  MarkChatUnread,
  PeopleAlt,
  NotificationsActive,
} from '@mui/icons-material'
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
  Stack,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import {useNavigate, Routes, Route} from 'react-router-dom'
import {useValue} from '../../context/ContextProvider'
import {useMemo, useState} from 'react'
import Rooms from './rooms/Rooms'
import Users from './users/Users'
import Main from './main/Main'
import Requests from './requests/Requests'
import Messages from '../messages/Messages'
import {storeRoom} from '../../actions/room'
import {logOut} from '../../actions/user'
import useCheckToken from '../../hooks/useCheckToken'

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
  useCheckToken()
  const {
    state: {
      location,
      details,
      images,
      updatedRoom,
      deletedImages,
      addedImages,
      currentUser,
    },
    dispatch,
  } = useValue()

  const [selectedLink, setSelectedLink] = useState('')

  const list = useMemo(
    () => [
      {
        title: 'Main',
        icon: <Dashboard />,
        link: '',
        component: <Main {...{setSelectedLink, link: ''}} />,
      },
      {
        title: 'Users',
        icon: <PeopleAlt />,
        link: 'users',
        component: <Users {...{setSelectedLink, link: 'users'}} />,
      },
      {
        title: 'Rooms',
        icon: <KingBed />,
        link: 'rooms',
        component: <Rooms {...{setSelectedLink, link: 'rooms'}} />,
      },
      {
        title: 'Requests',
        icon: <NotificationsActive />,
        link: 'requests',
        component: <Requests {...{setSelectedLink, link: 'requests'}} />,
      },
      {
        title: 'Messages',
        icon: <MarkChatUnread />,
        link: 'messages',
        component: <Messages {...{setSelectedLink, link: 'messages'}} />,
      },
    ],
    [],
  )

  const navigate = useNavigate()

  const handleLogout = () => {
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
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{opacity: open ? 1 : 0}}
                />
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
        <Box
          sx={{
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Stack
            direction='column'
            justifyContent='space-between'
            alignItems='center'
            //sx={{height: '100%'}}
          >
            {open && <Typography>{currentUser?.name}</Typography>}
            <Typography variant='body2'>
              {currentUser?.role || 'Role'}
            </Typography>
            {open && (
              <Typography variant='body2'>{currentUser?.email}</Typography>
            )}
            <Tooltip title='Logout' sx={{mb: 2}}>
              <IconButton
                onClick={handleLogout}
                sx={{position: 'absolute', bottom: '10px !important'}}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Drawer>
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route
              key={item.title}
              path={item.link}
              element={item.component}
            ></Route>
          ))}
        </Routes>
      </Box>
    </>
  )
}

export default SideList

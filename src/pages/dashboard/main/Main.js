import {Group, MapsHomeWork} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import {useEffect} from 'react'
import {useValue} from '../../../context/ContextProvider'
import {getUsers} from '../../../actions/user'
import {getRooms} from '../../../actions/room'
import PieRoomsCost from './PieRoomsCost'

function Main({setSelectedLink, link}) {
  const {
    state: {users, rooms},
    dispatch,
  } = useValue()
  useEffect(() => {
    setSelectedLink(link)
    if (users.length === 0) getUsers(dispatch)
    if (rooms.length === 0) getRooms(dispatch)
  }, [])

  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          md: 'grid',
        },
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{p: 3}}>
        <Typography variant='h4'>Total users</Typography>
        <Box
          sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <Group sx={{height: 100, width: 100, opacity: 0.3, mr: 1}} />
          <Typography variant='h4'>{users.length}</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{p: 3}}>
        <Typography variant='h4'>Total rooms</Typography>
        <Box
          sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <MapsHomeWork sx={{height: 100, width: 100, opacity: 0.3, mr: 1}} />
          <Typography variant='h4'>{rooms.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p: 2, gridColumn: 3, gridRow: '1/4'}}>
        <Box>
          <Typography>Recently added users</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => {
              console.log('useris: ', user)
              let theDate = new Date(user?.createdAt)
              return (
                <>
                  <Box key={user._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={user?.name} src={user?.photoURL} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.name}
                        secondary={`Time created: ${theDate.getFullYear()}/${theDate.getMonth()}/${theDate.getDate()} ${theDate.getHours()}:${theDate.getMinutes()}:${theDate.getSeconds()}`}
                      />
                    </ListItem>
                    {i !== 3 && <Divider variant='inset' />}
                  </Box>
                </>
              )
            })}
          </List>
        </Box>
        <Divider sx={{mt: 3, mb: 3, opacity: 0.7}} />
        <Box>
          <Typography>Recently added rooms</Typography>
          <List>
            {rooms.slice(0, 4).map((room, i) => {
              console.log('room is: ', room)
              let theDate = new Date(room?.createdAt)
              let nowDate = new Date()
              let passed = 'a few moments ago'
              if (nowDate.getFullYear() - theDate.getFullYear() > 0) {
                passed = `${
                  nowDate.getFullYear() - theDate.getFullYear()
                } years ago`
              } else {
                if (nowDate.getMonth() - theDate.getMonth() > 0) {
                  passed = `${
                    nowDate.getMonth() - theDate.getMonth() > 0
                  } months ago`
                } else {
                  if (nowDate.getDate() - theDate.getDate() > 0) {
                    passed = `${nowDate.getDate() - theDate.getDate()} days ago`
                  }
                }
              }
              return (
                <>
                  <Box key={room._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={room?.title}
                          src={room?.images[0]}
                          variant='rounded'
                        />
                      </ListItemAvatar>
                      <ListItemText primary={room?.title} secondary={passed} />
                    </ListItem>
                    {i !== 3 && <Divider variant='inset' />}
                  </Box>
                </>
              )
            })}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p: 2, gridColumn: '1/3'}}>
        <PieRoomsCost />
      </Paper>
    </Box>
  )
}

export default Main

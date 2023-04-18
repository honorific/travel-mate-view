import {Delete, Edit, Preview} from '@mui/icons-material'
import {Box, IconButton, Tooltip} from '@mui/material'
import React from 'react'
import {useValue} from '../../../context/ContextProvider'
import {deleteRoom} from '../../../actions/room'
import {useNavigate} from 'react-router-dom'

const RoomsActions = ({params}) => {
  const {_id, lng, lat, price, title, description, images, uid} = params.row
  const {
    state: {currentUser},
    dispatch,
  } = useValue()
  const navigate = useNavigate()
  const handleEdit = () => {
    dispatch({type: 'UPDATE_LOCATION', payload: {lng, lat}})
    dispatch({type: 'UPDATE_DETAILS', payload: {price, title, description}})
    dispatch({type: 'UPDATE_IMAGES', payload: images})
    dispatch({type: 'UPDATE_UPDATED_ROOM', payload: {_id, uid}})
    dispatch({type: 'UPDATE_SECTION', payload: 2})
    navigate('/')
  }
  return (
    <Box>
      <Tooltip title='view room details'>
        <IconButton
          onClick={() => {
            dispatch({type: 'UPDATE_ROOM', payload: params.row})
            console.log('i am clicked')
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='edit this room'>
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='delete this room'>
        <IconButton
          onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default RoomsActions

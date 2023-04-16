import {Delete, Edit, Preview} from '@mui/icons-material'
import {Box, IconButton, Tooltip} from '@mui/material'
import React from 'react'
import {useValue} from '../../../context/ContextProvider'

const RoomsActions = ({params}) => {
  const {dispatch} = useValue()
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
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='delete this room'>
        <IconButton onClick={() => {}}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default RoomsActions

import {Delete, Edit, Preview} from '@mui/icons-material'
import {Box, IconButton, Tooltip} from '@mui/material'
import React from 'react'

const RoomsActions = ({params}) => {
  return (
    <Box>
      <Tooltip title='view room details'>
        <IconButton onClick={() => {}}>
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

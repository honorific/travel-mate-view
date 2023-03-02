import {Mail} from '@mui/icons-material'
import {Badge, Box, IconButton} from '@mui/material'
import React from 'react'

const UserIcons = () => {
  return (
    <Box>
      <IconButton>
        <Badge color='error' badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
    </Box>
  )
}

export default UserIcons

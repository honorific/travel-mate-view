import {ChevronLeft} from '@mui/icons-material'
import {Box, Drawer, IconButton, styled, Typography} from '@mui/material'
import React from 'react'

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const sidebar = ({isOpen, setIsOpen}) => {
  return (
    <Drawer variant='persistent' hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Apply search or filter</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </DrawerHeader>
      <Box sx={{width: '240px', p: 3}}></Box>
    </Drawer>
  )
}

export default sidebar

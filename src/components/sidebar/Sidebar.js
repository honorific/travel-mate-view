import {ChevronLeft} from '@mui/icons-material'
import {Box, Drawer, IconButton, styled, Typography} from '@mui/material'
import React from 'react'
import {useValue} from '../../context/ContextProvider'
import GeocoderInput from './GeocoderInput'
import PriceSlider from './PriceSlider'

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Sidebar = ({isOpen, setIsOpen}) => {
  const {containerRef} = useValue()
  console.log('containerRef is: ', containerRef)
  return (
    <Drawer variant='persistent' hideBackdrop={false} open={isOpen}>
      <DrawerHeader>
        <Typography>Apply search or filter</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </DrawerHeader>
      <Box sx={{width: '240px', p: 3}}>
        <Box ref={containerRef}></Box>
        {/* <GeocoderInput /> */}
        <PriceSlider />
      </Box>
    </Drawer>
  )
}

export default Sidebar

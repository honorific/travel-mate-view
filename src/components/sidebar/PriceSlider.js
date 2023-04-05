import {Box, Typography} from '@mui/material'
import React from 'react'
import {useValue} from '../../context/ContextProvider'

const PriceSlider = () => {
  const {
    state: {priceFilter},
    dispatch,
  } = useValue()
  return (
    <Box sx={{mt: 5}}>
      <Typography>{`max price is $ ${priceFilter}`}</Typography>
    </Box>
  )
}

export default PriceSlider

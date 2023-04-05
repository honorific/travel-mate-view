import {Box, Slider, Typography} from '@mui/material'
import React from 'react'
import {useValue} from '../../context/ContextProvider'

const marks = [
  {value: 0, label: '$0'},
  {value: 25, label: '$25'},
  {value: 50, label: '$50'},
]

const PriceSlider = () => {
  const {
    state: {priceFilter},
    dispatch,
  } = useValue()
  console.log(' priceFilter is: ', priceFilter)
  return (
    <Box sx={{mt: 5}}>
      <Typography>{`max price is $ ${priceFilter}`}</Typography>
      <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay='auto'
        marks={marks}
        value={priceFilter}
        onChange={(e) =>
          dispatch({type: 'FILTER_PRICE', payload: e.target.value})
        }
      />
    </Box>
  )
}

export default PriceSlider

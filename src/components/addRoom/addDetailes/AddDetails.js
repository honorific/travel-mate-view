import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material'
import {maxWidth} from '@mui/system'
import {useState} from 'react'
import {useValue} from '../../../context/ContextProvider'

const AddDetails = () => {
  const {
    state: {
      details: {title, descruption, price},
    },
    dispatch,
  } = useValue()

  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value)
    setCostType(costType)
    if (costType === 0) {
      dispatch({type: 'UPDATE_DETAILS', payload: {price: 0}})
    } else {
      dispatch({type: 'UPDATE_DETAILS', payload: {price: 15}})
    }
  }

  const [costType, setCostType] = useState(price ? 1 : 0)

  const handlePriceChange = (e) => {
    dispatch({type: 'UPDATE_DETAILS', payload: {price: e.target.value}})
  }
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '&.MuiTextField-root': {width: '100%', maxWidth: 500, m: 1},
      }}
    >
      <FormControl>
        <RadioGroup
          name='costType'
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          <FormControlLabel value={0} control={<Radio />} label='Free Stay' />
          <FormControlLabel value={1} control={<Radio />} label='Nominal fee' />
          {Boolean(costType) && (
            <TextField
              sx={{width: '7ch !important'}}
              variant='standard'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              inputProps={{type: 'number', min: 1, max: 50}}
              value={price}
              onChange={handlePriceChange}
              name='price'
            />
          )}
        </RadioGroup>
      </FormControl>
    </Stack>
  )
}

export default AddDetails

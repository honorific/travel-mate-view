import {Check, Save} from '@mui/icons-material'
import {Box, CircularProgress, Fab} from '@mui/material'
import {green} from '@mui/material/colors'
import React, {useEffect, useState} from 'react'

const UsersActions = ({params, rowId, setRowId}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (Array.isArray(rowId)) {
      if (rowId.length > 0) {
        for (let i = 0; i < rowId.length; i++) {
          if (rowId[i] == params.id) {
            setDisabled(false)
          }
        }
      } else {
        setDisabled(true)
      }
    }
  }, [rowId.length, params.id])

  const handleSubmit = async () => {}

  return (
    <Box sx={{position: 'relative', m: 1}}>
      {success ? (
        <Fab
          color='primary'
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': {bgColor: green[700]},
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color='primary'
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={disabled}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export default UsersActions

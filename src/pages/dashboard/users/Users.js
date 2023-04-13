import {Box, Typography} from '@mui/material'
import {useEffect} from 'react'

function Users({setSelectedLink, link}) {
  useEffect(() => {
    setSelectedLink(link)
  }, [])
  return (
    <Box sx={{height: 400, width: '100%'}}>
      <Typography
        variant='h3'
        component='h3'
        sx={{textAlign: 'center', mt: 3, mb: 3}}
      >
        Manage users
      </Typography>
    </Box>
  )
}

export default Users

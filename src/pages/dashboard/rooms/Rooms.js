import {Avatar, Box, Container, Tooltip, Typography} from '@mui/material'
import {DataGrid, gridClasses} from '@mui/x-data-grid'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useValue} from '../../../context/ContextProvider'
import {getRooms} from '../../../actions/room'
import {grey} from '@mui/material/colors'
import RoomsActions from './RoomsActions'

const Rooms = ({setSelectedLink, link}) => {
  const {
    state: {rooms},
    dispatch,
  } = useValue()

  useEffect(() => {
    setSelectedLink(link)
    if (rooms.length === 0) getRooms(dispatch)
  }, [])

  const columns = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'Photo',
        width: 70,
        renderCell: (params) => (
          <Avatar src={params.row.images[0]} variant='rounded' />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: 'price',
        headerName: 'Cost',
        width: 70,
        renderCell: (params) => '$' + params.row.price,
      },
      {field: 'title', headerName: 'Title', width: 170},
      {field: 'description', headerName: 'Description', width: 200},
      {field: 'lng', headerName: 'Longitude', width: 110},
      {field: 'lat', headerName: 'latitude', width: 110},
      {
        field: 'uName',
        headerName: 'Added by',
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created at',
        width: 200,
        renderCell: (params) => {
          let theDate = new Date(params.row.createdAt)
          return (
            theDate.getFullYear() +
            '/' +
            ('0' + (theDate.getMonth() + 1)).slice(-2) +
            ' ' +
            theDate.getHours() +
            ':' +
            theDate.getMinutes() +
            ':' +
            theDate.getSeconds()
          )
        },
      },
      {field: '_id', hide: true},
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        renderCell: (params) => <RoomsActions {...{params}} />,
      },
    ],
    [],
  )
  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    }
  }, [])

  return (
    <Box
      sx={{
        height: 400,
        width: {
          lg: '98%',
          md: '960px',
        },
        p: 0,
        m: 0,
      }}
    >
      <Typography
        variant='h3'
        component='h3'
        sx={{textAlign: 'center', mt: 3, mb: 3}}
      >
        Manage users
      </Typography>
      <DataGrid
        columns={columns}
        rows={rooms}
        initialState={{
          pagination: {paginationModel: {pageSize: 5}},
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 25]}
        getRowSpacing={getRowSpacing}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
          width: '100%',
        }}
      />
    </Box>
  )
}

export default Rooms

import {Avatar, Box, Typography} from '@mui/material'
import {DataGrid, gridClasses} from '@mui/x-data-grid'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useValue} from '../../../context/ContextProvider'
import {getUsers} from '../../../actions/user'
import {grey} from '@mui/material/colors'
import UsersActions from './UsersActions'

function Users({setSelectedLink, link}) {
  const {
    state: {users},
    dispatch,
  } = useValue()

  const [rowId, setRowId] = useState(null)

  useEffect(() => {
    setSelectedLink(link)
    if (users.length === 0) getUsers(dispatch)
  }, [])

  const columns = useMemo(
    () => [
      {
        field: 'photoURL',
        headerName: 'Avatar',
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      {field: 'name', headerName: 'Name', width: 170},
      {field: 'email', headerName: 'Email', width: 200},
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
        type: 'singleSelect',
        valueOptions: ['basic', 'editor', 'admin'],
        editable: true,
      },
      {
        field: 'active',
        headerName: 'Active',
        width: 100,
        type: 'boolean',
        editable: true,
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
      {field: '_id', headerName: 'ID', width: 220},
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => <UsersActions {...{params, rowId, setRowId}} />,
      },
    ],
    [rowId],
  )
  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    }
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
      <DataGrid
        columns={columns}
        rows={users}
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
        }}
      />
    </Box>
  )
}

export default Users

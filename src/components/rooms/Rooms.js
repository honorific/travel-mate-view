import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material'
import React from 'react'
import {useValue} from '../../context/ContextProvider'
import {StarBorder} from '@mui/icons-material'

const Rooms = () => {
  const {
    state: {filteredRooms},
  } = useValue()
  console.log('filteredRooms are: ', filteredRooms)
  return (
    <Container>
      <ImageList gap={12} sx={{mb: 8}}>
        {filteredRooms.map((room) => (
          <Card key={room._id}>
            <ImageListItem sx={{height: '100% !important'}}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={room.price === 0 ? 'Free stay' : '$' + room.price}
                actionIcon={
                  <Tooltip title={room.uName} sx={{mr: '5px'}}>
                    <Avatar src={room.uPhoto} />
                  </Tooltip>
                }
                position='top'
              />
              <img
                src={room.images[0]}
                alt={room.title}
                loading='lazy'
                style={{cursor: 'pointer'}}
              />
              <ImageListItemBar
                title={room.title}
                actionIcon={
                  <Rating
                    sx={{color: 'rgba(255,255,255, 0.8)', mr: '5px'}}
                    name='room-rating'
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{color: 'rgba(255,255,255, 0.8)'}} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  )
}

export default Rooms

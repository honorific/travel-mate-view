import {Cancel} from '@mui/icons-material'
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import {useValue} from '../../../context/ContextProvider'

const ImagesList = () => {
  const handleDelete = async (image) => {}
  const {
    state: {images, currentUser},
    dispatch,
  } = useValue()
  return (
    <ImageList
      rowHeight={200}
      cols={4}
      sx={{
        '&.MuiImageList-root': {
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr)!important)',
        },
      }}
    >
      {images.map((image, index) => {
        return (
          <ImageListItem key={index} cols={1} rows={1}>
            <img src={image} loading='lazy' style={{height: '100%'}} />
            <ImageListItemBar
              position='top'
              sx={{
                background:
                  'linear-gradient:(to bottom, rgba(0,0,0,0.7)0% , rgba(0,0,0,0.3) 70% , rgba(0,0,0,0)100%)',
              }}
              actionIcon={
                <IconButton
                  sx={{color: 'white'}}
                  onClick={() => handleDelete(image)}
                >
                  <Cancel />
                </IconButton>
              }
            ></ImageListItemBar>
          </ImageListItem>
        )
      })}
    </ImageList>
  )
}

export default ImagesList

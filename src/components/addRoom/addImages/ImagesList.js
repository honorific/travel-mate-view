import {Cancel} from '@mui/icons-material'
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import {useValue} from '../../../context/ContextProvider'
import deleteFile from '../../../firebase/deleteFile'
import {v4 as uuidv4} from 'uuid'

const ImagesList = () => {
  const handleDelete = async (image) => {
    dispatch({type: 'DELETE_IMAGE', payload: image})
    const imageName = image?.split(`${currentUser?.id}%2F`)[1].split('?')[0]
    try {
      await deleteFile(`rooms/${currentUser?.id}/${imageName}`)
    } catch (error) {
      console.log(error)
    }
  }

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
          <ImageListItem key={uuidv4()} cols={1} rows={1}>
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

import {
  AppBar,
  Avatar,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import React, {forwardRef} from 'react'
import {useValue} from '../../context/ContextProvider'
import {Close} from '@mui/icons-material'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, EffectCoverflow, Lazy, Zoom} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/zoom'
//import 'swiper/css/lazy'
import 'swiper/css/effect-coverflow'
import './swiper.css'

const Transition = forwardRef((props, ref) => {
  return <Slide direction='up' {...props} ref={ref} />
})

const Room = () => {
  const {
    state: {room},
    dispatch,
  } = useValue()

  const handleClose = () => {
    dispatch({type: 'UPDATE_ROOM', payload: null})
  }

  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' component='h3' sx={{ml: 2, flex: 1}}>
            {room?.title}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{pt: 5}}>
        <Swiper
          //lazy was removed below array
          modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect='coverflow'
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {room?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className='swiper-zoom-container'>
                <img src={url} alt='room' />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={room?.uName || ''}
            sx={{position: 'absolute', bottom: '8px', left: '8px', zIndex: 2}}
          >
            <Avatar src={room?.uPhoto} />
          </Tooltip>
        </Swiper>
      </Container>
    </Dialog>
  )
}

export default Room

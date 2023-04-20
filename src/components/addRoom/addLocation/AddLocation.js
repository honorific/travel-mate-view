import {Box} from '@mui/material'
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {useValue} from '../../../context/ContextProvider'
import {useEffect, useRef} from 'react'
import Geocoder from './Geocoder'

const AddLocation = () => {
  const {
    state: {
      location: {lng, lat},
      currentUser,
    },
    dispatch,
  } = useValue()

  const mapref = useRef()

  useEffect(() => {
    const storedLocation = JSON.parse(
      localStorage.getItem(currentUser.id),
    )?.location
    if (!lng && !lat && !storedLocation?.lng && !storedLocation?.lat) {
      fetch('https://ipapi.co/json')
        .then((rawResponse) => {
          return rawResponse.json()
        })
        .then((data) => {
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: {lng: data.longitude, lat: data.latitude},
          })
        })
    }
  }, [])

  useEffect(() => {
    if ((lng || lat) && mapref.current) {
      mapref.current.flyTo({
        center: [lng, lat],
      })
    }
  }, [lng, lat])

  return (
    <Box sx={{height: 400, position: 'relative'}}>
      <ReactMapGL
        ref={mapref}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) =>
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: {lng: e.lngLat.lng, lat: e.lngLat.lat},
            })
          }
        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl
          position='top-left'
          trackUserLocation
          onGeolocate={(e) => {
            console.log('geo locate e: ', e)
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: {lng: e.coords.longitude, lat: e.coords.latitude},
            })
          }}
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  )
}

export default AddLocation

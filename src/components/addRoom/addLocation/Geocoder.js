import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import {useValue} from '../../../context/ContextProvider'

const GeoCoder = () => {
  const {dispatch} = useValue()
  const ctrl = new MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAP_TOKEN,
    marker: false,
    collapsed: true,
  })
  useControl(()=> ctrl)
  return null
}

export default GeoCoder

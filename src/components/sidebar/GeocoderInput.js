import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {useEffect} from 'react'
import {useValue} from '../../context/ContextProvider'

const ctrl = new MapboxGeocoder({
  marker: false,
  accessToken: process.env.REACT_APP_MAP_TOKEN,
})

const GeocoderInput = () => {
  const {mapRef, containerRef, dispatch} = useValue()
  useEffect(() => {
    if (containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0])
    }
    containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))

    ctrl.on('result', (e) => {
      console.log('e of onResult: ', e)
      const coords = e.result.geometry.coordinates
      dispatch({
        type: 'FILTER_ADDRESS',
        payload: {lng: coords[0], lat: coords[1]},
      })
    })

    ctrl.on('clear', (e) => {
      console.log('e of onClear: ', e)
      dispatch({type: 'CLEAR_ADDRESS'})
      console.log('important mapref: ', mapRef.current)
      const center = mapRef.current.getCenter()
      console.log('the center is: ', center)
      mapRef.current.flyTo({center: center, zoom: 0})
    })
  }, [])

  return null
}

export default GeocoderInput

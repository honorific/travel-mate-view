import React, {useEffect} from 'react'
import {getRooms} from '../../actions/room'
import {useValue} from '../../context/ContextProvider'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Box, Tooltip, Avatar, Paper} from '@mui/material'
import supercluster from 'supercluster'
import {useState} from 'react'
import './cluster.css'
import GeocoderInput from '../sidebar/GeocoderInput'
import PopupRoom from './PopupRoom'

const ClusterMap = () => {
  const {
    state: {currentUser, filteredRooms},
    dispatch,
    mapRef,
  } = useValue()

  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom] = useState(0)
  const [popupInfo, setPopupInfo] = useState(null)
  const [theClusterZoom, setTheClusterZoom] = useState(null)
  const [izZoom, setIzZoom] = useState(null)

  const superCluster = new supercluster({
    radius: 75,
    maxZoom: 20,
  })

  useEffect(() => {
    getRooms(dispatch)
  }, [])

  useEffect(() => {
    const points = filteredRooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }))
    setPoints(points)
  }, [filteredRooms])

  useEffect(() => {
    superCluster.load(points)
    setClusters(superCluster.getClusters(bounds, zoom))
    console.log('cluster tiles: ', superCluster.getTile(1, 1, 1))
    if (theClusterZoom) {
      setIzZoom(
        Math.min(superCluster.getClusterExpansionZoom(theClusterZoom), 10),
      )
    }
  }, [points, zoom, bounds, theClusterZoom])

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat())
    }
  }, [mapRef?.current])

  return (
    <Box sx={{position: 'relative', height: '90vh', width: '100%'}}>
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        initialViewState={{
          longitude: 2.4156,
          latitude: 28.9444647055242,
        }}
        ref={mapRef}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters?.map((cluster) => {
          const {cluster: isCluster, point_count} = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates
          if (isCluster) {
            return (
              <Marker
                key={`cluster${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className='cluster-marker'
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    setTheClusterZoom(cluster.id)
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom: izZoom,
                      speed: 1,
                    })
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            )
          }
          {
            return (
              <Marker
                key={`room${cluster.properties.roomId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.uName}>
                  <Avatar
                    src={cluster.properties.uPhoto}
                    component={Paper}
                    elevation={2}
                    onClick={() => setPopupInfo(cluster.properties)}
                  ></Avatar>
                </Tooltip>
              </Marker>
            )
          }
        })}
        <GeocoderInput />
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={setPopupInfo(null)}
          >
            <PopupRoom {...{popupInfo}} />
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  )
}

export default ClusterMap

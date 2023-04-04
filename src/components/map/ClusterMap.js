import React, {useEffect} from 'react'
import {getRooms} from '../../actions/room'
import {useValue} from '../../context/ContextProvider'
import ReactMapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Box, Tooltip, Avatar, Paper} from '@mui/material'
import supercluster from 'supercluster'
import {useState} from 'react'
import './cluster.css'

const ClusterMap = () => {
  const {
    state: {currentUser, rooms},
    dispatch,
    mapRef,
  } = useValue()

  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom] = useState(0)

  const superCluster = new supercluster({
    radius: 75,
    maxZoom: 20,
  })

  useEffect(() => {
    getRooms(dispatch)
    console.log('rooms are', rooms)
    console.log('current user is : ', currentUser)
  }, [])

  useEffect(() => {
    const points = rooms.map((room) => ({
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
    console.log('points are: ', points)
  }, [rooms])

  useEffect(() => {
    superCluster.load(points)
    console.log('bounds before is: ', bounds)
    setClusters(superCluster.getClusters(bounds, zoom))
  }, [points, zoom, bounds])

  console.log('clusters are: ', clusters)

  //[points, zoom, bounds]

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat())
      console.log('bounds are: ', bounds)
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
                    const zoom = Math.min(
                      superCluster.getClusterExpansionZoom(cluster.id),
                      20,
                    )
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
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
                  ></Avatar>
                </Tooltip>
              </Marker>
            )
          }
        })}
      </ReactMapGL>
    </Box>
  )
}

export default ClusterMap

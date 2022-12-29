import { Button, ButtonGroup, IconButton, Input } from '@mui/material'
import { Box } from '@mui/system'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
// import 'mapbox-gl/dist/mapbox-gl.css'

const center = { lat: 23.810331, lng: 90.412521 }

function GoRentalMap(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA7Hbtoc7jXPbTNZwdGRzkpt21M3l5YWwE',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()


  useEffect(() => {
    async function calculateRoute() {
      if (props?.origin === '' || props?.destination === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: props?.origin,
        destination: props?.destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)

      props.setMapData({ distance, duration })
    }
    calculateRoute()


  }, [distance, duration, props])



  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  if (!isLoaded) {
    return <p>loading...</p>
  }



  return (

    <div className='relative'>
      <GoogleMap className='w-[100vw] mx-auto'
        center={center}
        // minZoom={5}
        zoom={15}

        mapContainerStyle={{ width: '100vw', height: '800px' }}

        onLoad={map => setMap(map)}
      >


        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>

  )
}

export default GoRentalMap;

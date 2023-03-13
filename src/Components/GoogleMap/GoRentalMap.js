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


const options = {
  gestureHandling: "greedy",
  keyboardShortcuts: false,
  zoomControl: false,
  styles: [{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d6e2e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#cfd4d5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7492a8"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": 25
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#cfd4d5"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7492a8"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde2e3"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -100
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#588ca4"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a9de83"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#bae6a1"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c6e8b3"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#bae6a1"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -45
      },
      {
        "lightness": 10
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#41626b"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c1d1d6"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#a6b5bb"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#9fb6bd"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [
      {
        "saturation": -70
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b4cbd4"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#588ca4"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#008cb5"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": -5
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a6cbe3"
      }
    ]
  }
  ],
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
}

function GoRentalMap(props) {
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA7Hbtoc7jXPbTNZwdGRzkpt21M3l5YWwE',
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
const {origin,gps,destination,setMapData}=props
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()



  useEffect(() => {
// console.log(origin,'map origin');
// console.log(gps,'map gps');
    async function calculateRoute() {
      // if ((props?.gps===''&& props?.origin === '') || props?.destination === '') {
      //   return
      // }


      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin:origin?origin:gps,
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)

     setMapData({ distance, duration })
    }
    calculateRoute()
    
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        // console.log("map Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);

        setLat(() => position.coords.latitude)
        setLong(() => position.coords.longitude)
      })
    }

  }, [distance, duration,origin,destination,gps,setMapData])



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

  let center
  if (lat && long) {
    center = { lat: lat, lng: long }
  }
  else {
    center = { lat: 23.810331, lng: 90.412521 }
  }

  return (

    <div className='relative '>
      <GoogleMap className='w-[100vw] mx-auto'

        options={options}

        draggable={true}
        center={center}
        minZoom={5}
        zoom={15}

        mapContainerStyle={{ width: '100vw', height: '90vh' }}

        onLoad={map => setMap(map)}
      >


        <Marker
         
          position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>

  )
}

export default GoRentalMap;

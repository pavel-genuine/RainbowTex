import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { passengerFindCars } from '../../../api/api';
import FindCars, { darkTheme, GOOGLE_MAPS_API_KEY } from '../FindCars/FindCars'
import CarResult from './CarResult'
import SingleCarResult from './SingleCarResult'

const AllCarResults = ({ tripData, setTripData }) => {
    //    tripData?.coordinatesPickup?.lng
    const [coordinatesPickup, setCoordinatesPickup] = useState({})
    const [coordinatesDestination, setCoordinatesPickupDestination] = useState({})
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    function getCords() {
        if (window.google) {

            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({
                address: tripData?.startLocation
            }, (results, status) => {
                if (status == window.google.maps.GeocoderStatus.OK) {
                    const lat = results[0].geometry.location.lat()
                    const lng = results[0].geometry.location.lng()

                    setCoordinatesPickup({ lat, lng })

                }
            });
            geocoder.geocode({
                address: tripData?.destination
            }, (results, status) => {
                if (status == window.google.maps.GeocoderStatus.OK) {
                    const lat = results[0].geometry.location.lat()
                    const lng = results[0].geometry.location.lng()

                    setCoordinatesPickupDestination({ lat, lng })

                    

                }
            });
        }


    }


    async function calculateRoute() {
        // if ((props?.gps===''&& props?.origin === '') || props?.destination === '') {
        //   return
        // }
        
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: tripData?.startLocation,
            destination: tripData?.destination,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        const distance = results.routes[0].legs[0].distance.text.split(" ");
        setDistance(Number(distance[0]))
        setDuration(results.routes[0].legs[0].duration.text)
        

    }



    const fetcher = async () => {
        const { data } = await passengerFindCars(`?startLat=${coordinatesPickup?.lat}&startLng=${coordinatesPickup?.lng}`)
        return data
    }

    let { data: cars, isLoading } = useQuery(["cars",], () => fetcher())




    useEffect(() => {
        getCords()

       calculateRoute()

    }, [])



    return (
        <div className=''>
            <Box
                className='grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-6 space-y-3 md:space-y-0  md:w-[90%] w-[95%] mx-auto '>

                {
                    cars?.length &&
                    cars?.map(car => <SingleCarResult coordinatesDestination={coordinatesDestination}
                        coordinatesPickup={coordinatesPickup}
                        tripData={tripData} car={car} key={car?.id}
                        distance={distance}
                        duration={duration}
                        
                        ></SingleCarResult>)
                }

            </Box>

        </div>
    )
}

export default AllCarResults
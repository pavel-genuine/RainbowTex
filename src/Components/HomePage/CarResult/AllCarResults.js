import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { passengerBookingRequest, passengerFindCars } from '../../../api/api';
import FindCars, { darkTheme } from '../FindCars/FindCars'
import CarResult from './CarResult'
import SingleCarResult from './SingleCarResult'

const AllCarResults = ({ tripData }) => {
    //    tripData?.coordinatesPickup?.lng
    const fetcher = async () => {
        const { data } = await passengerFindCars(`?startLat=${23.8698483}&startLng=${90.3979137}`)
        return data
    }

    let { data: cars, isLoading } = useQuery(["cars",], () => fetcher())

    const handleConfirm = async () => {
        const req = {
            carId: 11 ,
            carownerId: 1 ,
            serviceId:1,
            startLocation: tripData?.startLocation,
            destination: tripData?.destination,
            distance: tripData?.distance,
            schedule: tripData?.schedule,
            // startLat: tripData?.coordinatesPickup?.lat,
            // startLng: tripData?.coordinatesPickup?.lng,
            // destLat:tripData?.coordinatesDestination?.lat,
            // destLng:tripData?.coordinatesDestination?.lng,
        }

        const { data } = await passengerBookingRequest(req)

        console.log(data, 'res')
    }

    return (
        <div className=''>
            <Box
                className='grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-6 space-y-3 md:space-y-0  md:w-[90%] w-[95%] mx-auto '>

                {
                    cars?.map(car => <SingleCarResult tripData={tripData} car={car} key={car?.id}></SingleCarResult>)
                }

            </Box>

            <Button onClick={handleConfirm} className='h-8 w-[120px]  ' variant='contained'>Confirm</Button>

        </div>
    )
}

export default AllCarResults
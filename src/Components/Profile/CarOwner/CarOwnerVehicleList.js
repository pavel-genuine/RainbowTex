import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CarOwnerSingleVehicle from './CarOwnerSingleVehicle';
import CarOwnerAddCar, { ArrowIcon } from './CarOwnerAddCar';
import { Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { carOwnerAllCars } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';

export default function CarOwnerVehicleList() {

    const fetcher = async () => {
        const { data } = await carOwnerAllCars()
        return data
    }

    let { data, isLoading } = useQuery(["ownercars",], () => fetcher())

    return (

        <Box className='pt-16 md:pt-20 mx-auto relative min-h-[100vh] md:w-[360px] w-[100vw]' sx={{ bgcolor: 'background.paper' }}>
            <Box className='flex items-center py-1  bg-primary text-white  '>
                <Link to='/profile'>
                    <IconButton className='w-10 h-10' style={{ color: 'white' }} aria-label="back">
                        <ArrowIcon />
                    </IconButton>
                </Link>
                <h1 className='md:text-lg mx-auto text-md pr-5 '>Vehicles </h1>
            </Box>
            <div className='w-40 mx-auto my-5'>
                <CarOwnerAddCar></CarOwnerAddCar>
            </div>
            <Divider></Divider>
            <Box className='pb-20'>
                <List component="nav" aria-label="primary">
                    {
                        data?.length > 0 &&

                        <div>
                            {
                                data?.map(car => <CarOwnerSingleVehicle car={car}></CarOwnerSingleVehicle>)

                            }
                        </div>


                    }
                </List>
            </Box>


        </Box>
    );

}
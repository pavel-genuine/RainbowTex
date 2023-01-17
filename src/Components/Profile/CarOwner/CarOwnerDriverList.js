import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CarOwnerSingleDriver from './CarOwnerSingleDriver';
import CarOwnerAddDriver from './CarOwnerAddDriver';
import { Link } from 'react-router-dom';
import { Divider, IconButton } from '@mui/material';
import { ArrowIcon } from './CarOwnerAddCar';
import { carOwnerAllDrivers } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';

export default function CarOwnerDriverList() {

    const fetcher = async () => {
        const { data } = await carOwnerAllDrivers()
        return data
    }

    let { data, isLoading } = useQuery(["drivers"], () => fetcher())

    console.log('drivers', data);


    return (
        <Box className=' pt-16 md:pt-20 pb-40 mx-auto relative min-h-[100vh] md:w-[360px] w-[100vw]' sx={{ bgcolor: 'background.paper' }}>
            <Box className='flex items-center py-1  bg-primary text-white  '>
                <Link to='/profile'>
                    <IconButton className='w-10 h-10' style={{ color: 'white' }} aria-label="back">
                        <ArrowIcon />
                    </IconButton>
                </Link>
                <h1 className='md:text-lg mx-auto text-md pr-5 '>Drivers </h1>
            </Box>
            <div className='w-40 mx-auto my-5'>
                <CarOwnerAddDriver></CarOwnerAddDriver>
            </div>
            <Divider></Divider>
            <Box className=''>
                <List component="nav" aria-label="primary">
                    {
                        data?.length > 0 &&
                        <div>
                            {
                                data?.map(driver => <CarOwnerSingleDriver driver={driver}></CarOwnerSingleDriver>)
                            }
                        </div>
                    }
                </List>
            </Box>
        </Box>
    );
}
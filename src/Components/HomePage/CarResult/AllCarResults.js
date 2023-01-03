import { ThemeProvider } from '@material-tailwind/react'
import { Box } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { findCars } from '../../../api/api'
import FindCars, { darkTheme } from '../FindCars/FindCars'
import CarResult from './CarResult'
import SingleCarResult from './SingleCarResult'

const AllCarResults = () => {

    const fetcher = async () => {
        const { data } = await findCars(``)
        return data
    }

    let { data, isLoading } = useQuery(["cars",], () => fetcher())

    return (
        <div className=''>
            <Box
                className='grid grid-cols-1  md:grid-cols-3 gap-2 md:gap-6 space-y-3 md:space-y-0  md:w-[90%] w-[95%] mx-auto '>
                <CarResult></CarResult>
                <SingleCarResult></SingleCarResult>
                <SingleCarResult></SingleCarResult>
                <SingleCarResult></SingleCarResult>
                <SingleCarResult></SingleCarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
                <CarResult></CarResult>
            </Box>
        </div>
    )
}

export default AllCarResults
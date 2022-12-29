import { ThemeProvider } from '@material-tailwind/react'
import { Box } from '@mui/system'
import React from 'react'
import FindCars, { darkTheme } from '../FindCars/FindCars'
import CarResult from './CarResult'

const AllCarResults = () => {
  return (
    <div>
        <ThemeProvider theme={darkTheme}>
                    <div className=' bg-primary'>
                        <div className=' md:flex items-center w-[100vw] md:my-7 mb-4 md:mb-7'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-white w-6 h-6 ml-2 mt-2   ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                            </button>

                            <div className='space-y-1 md:space-x-5 md:space-y-0 md:flex justify-center items-center  md:w-[50%] mx-auto '>
                                <p className='block md:hidden w-[5%] mx-auto'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                    </svg>

                                </p>
                                <span className='md:inline hidden'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </span>

                            </div>

                        </div>

                        <FindCars></FindCars>

                    </div>
                </ThemeProvider>

                <Box
                    className='grid grid-cols-1 pt-20 md:pt-5 md:grid-cols-3 gap-2 md:gap-6 space-y-3 md:space-y-0  md:w-[90%] w-[95%] mx-auto '>

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
                    <CarResult></CarResult>
                </Box>
    </div>
  )
}

export default AllCarResults
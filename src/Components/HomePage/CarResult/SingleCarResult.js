import * as React from 'react';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Dialog, Divider, ThemeProvider } from '@mui/material';

import { useState } from 'react';
import { ArrowIcon } from '../../Profile/CarOwner/CarOwnerAddCar';
import SingleCarDetail from './SingleCarDetail';
import CarSlider from './CarSlider';

export default function SingleCarResult({ coordinatesDestination,
    coordinatesPickup, car, tripData,
    distance, duration }) {
    const [openCar, setOpenCar] = useState(false)

    return (
        <Box>

            <Box onClick={() => setOpenCar(true)} sx={{ boxShadow: 3 }} className='cursor-pointer relative ml-2 rounded bg-white'>
                <Box className='' sx={{ display: 'flex' }}>

                    <Box className='px-3 py-2 ' >
                        <div className='ml-[100px] w-[160px] h-[95px]'>
                          <CarSlider small={true} car={car}></CarSlider>
                        </div>

                        <div className='flex  items-center'>

                            <Box className='md:col-span-2  pt-3'>
                                <p className='text-xs text-primary font-semibold'>
                                    {car?.brand} {car?.model} {car?.year}
                                </p>
                                <p className='text-[grey] text-[11px]'>
                                    {car?.seat} Seats <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> {car?.carType
                                    }
                                    <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> AC
                                </p>
                                <p className='text-[11px] flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    {car?.pickupArea?.slice(0, 20)}...
                                </p>

                                {/* <p className='text-[11px] flex my-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-[orange] mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                4.5 (26)
                            </p> */}

                            </Box>

                            <p className=' mb-2'><span className='text-[10px] ml-[100px] '></span> <span className=' font-semibold py-10 text-sm'> ৳ {Math.ceil(parseFloat(distance) / 10 * car?.unitPrice)}</span></p>

                        </div>

                    </Box>
                </Box>
                <Divider></Divider>
            </Box>



            <Dialog
                // style={openSearch? { zIndex: 16100 }:{ zIndex: 15100 }}
                className=' bg-primary relative '
                fullScreen
                open={openCar}
                transitionDuration={1}
                // TransitionComponent={Transition}
                // keepMounted
                onClose={() => setOpenCar(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box>
                    <div className='fixed md:static  z-20  mx-auto w-[100vw] md:max-w-[360px]'>
                        <div className='bg-transparent md:bg-primary'>
                            <div className=' md:flex items-center '>
                                <Box className=' p-1 md:p-0 '>
                                    <span className='bg-primary rounded-full pt-2 pb-3 ' onClick={() => setOpenCar(false)}>
                                        <ArrowIcon></ArrowIcon>
                                    </span>
                                </Box>

                            </div>
                        </div>
                    </div>

                </Box>

                <SingleCarDetail coordinatesDestination={coordinatesDestination}
                    coordinatesPickup={coordinatesPickup}
                    tripData={tripData} car={car}

                    distance={distance}
                    duration={duration}

                ></SingleCarDetail>

            </Dialog>
        </Box>
    );
}
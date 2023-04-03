import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { passengerBookingRequest } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import GoRentalMap from '../../GoogleMap/GoRentalMap';
import { useEffect } from 'react';
import CarSlider from './CarSlider';


export default function SingleCarDetail({ coordinatesDestination,
    coordinatesPickup, setOpen, tripData, car, distance, duration }) {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [confirmed, setConfirmed] = React.useState(false);


    const images = [
        {
            label: 'img1',
            imgPath: car?.img1
        },
        {
            label: 'img2',
            imgPath: car?.img2
        },
        {
            label: 'img3',
            imgPath: car?.img3
        },
        {
            label: 'img4',
            imgPath: car?.img4
        },
    ];

    const maxSteps = images.length;




    const handleStepChange = (step) => {
        setActiveStep(step);
    };




    const handleConfirm = async () => {




        setTimeout(() => {
            setConfirmed(true)
        }, 1000);
        setTimeout(() => {
            setConfirmed(false)
        }, 3000);

        const req = {
            carId: car?.id,
            carownerId: car?.ownerId,
            serviceId: car?.serviceId,
            startLocation: tripData?.startLocation,
            destination: tripData?.destination,
            distance: distance,
            schedule: tripData?.schedule,
            startLat: coordinatesPickup?.lat,
            startLng: coordinatesPickup?.lng,
            destLat: coordinatesDestination?.lat,
            destLng: coordinatesDestination?.lng,
        }


        const { data } = await passengerBookingRequest(req)

        console.log(data, 'res')
    }

    return (
        <Box className='mx-auto w-[100vw] md:max-w-[360px]'>
            <CarSlider car={car}></CarSlider>

            <Box>
                <Box>
                    <Box className='grid grid-cols-4 '>
                        <Box className='pl-5 pb-1 col-span-2' >
                            <p className='text-sm text-primary font-semibold'>
                                {car?.brand} {car?.model} {car?.year}
                            </p>
                            <p className='text-[grey] text-[11px]'>
                                {car?.seat} Seats <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> {car?.carType
                                }
                                <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> AC
                            </p>
                            <p className='text-[12px] flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                {car?.pickupArea}
                            </p>

                            <p className='text-[12px] flex my-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-[orange] mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                4.5 (26)
                            </p>
                        </Box>
                        <Box className='col-span-2 px-6 ' >
                            {
                                <p className=' mb-2'><span className='text-[10px] '>Approx. rent :</span> <span className=' font-semibold py-10 text-sm'> ৳ {Math.ceil(parseFloat(distance) / 10 * car?.unitPrice)}</span></p>
                            }

                            <Button onClick={handleConfirm} className='h-8 w-[120px]  ' variant='contained'>Confirm</Button>
                        </Box>
                    </Box>
                    <Divider></Divider>

                    <Box className=' my-2 mx-5'>
                        <p><span className='text-[10px] '>Trip detail :</span></p>
                        <p><span className='text-[10px] '>Pick-up point :</span> <span className=' py-10 text-xs'>{tripData?.startLocation ? tripData?.startLocation : ''}</span></p>
                        <p><span className='text-[10px] '>Destination :</span> <span className=' py-10 text-xs'> {tripData?.destination ? tripData?.destination : ''}</span></p>
                        <p><span className='text-[10px] '>Approx. distance :</span> <span className=' py-10 text-xs'> {distance} km</span> </p>
                        <p><span className='text-[10px] '>Approx. duration :</span> <span className=' py-10 text-xs'> {duration}</span></p>
                        <p><span className='text-[10px] '>Schedule:</span> <span className=' py-10 text-xs'> {tripData?.schedule}</span></p>
                        {/* <p><span className='text-[10px] '>Schedule:</span> <span className=' py-10 text-xs'> {coordinatesDestination?.lat}</span></p> */}
                        {/* <p><span className='text-[10px] '>Schedule:</span> <span className=' py-10 text-xs'> {coordinatesPickup?.lat}</span></p> */}

                    </Box>
                </Box>
            </Box>

            {
                confirmed &&
                <p className='text-[13px] bg-[grey] mx-5 text-white text-center mt-10 p-2 rounded'>Booking request sent, soon you'll get the response</p>

            }        </Box>
    );
}


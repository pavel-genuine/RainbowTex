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

const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://www.motortrend.com/uploads/2022/05/2023-Toyota_Camry_XLE_Blueprint_014.jpg?fit=around%7C875:492.1875',
    },
    {
        label: 'Bird',
        imgPath:
            'https://www.motortrend.com/uploads/2022/05/2023-Toyota_Camry_XLE_Blueprint_009.jpg?fit=around%7C1000:625',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://www.motortrend.com/uploads/sites/10/2022/09/2023-toyota-camry-se-sedan-front-seat.png?fit=around%7C1000:625',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://www.motortrend.com/uploads/sites/10/2022/09/2023-toyota-camry-se-sedan-rear-seat.png?fit=around%7C1000:625',
    },
];

export default function SingleCarDetail({ setOpen, tripData, car }) {

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps = images.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    const handleConfirm = async () => {
        const req = {
            carId: car?.id,
            carownerId: car?.ownerId,
            serviceId: car?.serviceId,
            startLocation: tripData[0]?.startLocation,
            destination: tripData[0]?.destination,
            distance: tripData[0]?.distance,
            schedule: tripData[0]?.schedule
        }

        // console.log(req, 'req');

        const { data: res } = await passengerBookingRequest(req)

        console.log(res, 'res sss');

    }

    return (
        <Box className='mx-auto w-[100vw] md:max-w-[360px]'>

            <Box>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 255,
                                        display: 'block',
                                        maxWidth: 400,
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    className='mx-auto w-[20%] my-1'
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                />
            </Box>
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
                            {tripData[0]?.distance &&
                                <p className=' mb-2'><span className='text-[10px] '>Approx. rent :</span> <span className=' font-semibold py-10 text-sm'> ৳ {Math.ceil(parseFloat(tripData[0]?.distance?.substring(0,tripData[0]?.distance?.length-2))/10*400)}</span></p>
                            }

                            <Button onClick={handleConfirm} className='h-8 w-[120px]  ' variant='contained'>Confirm</Button>
                        </Box>
                    </Box>
                    <Divider></Divider>

                    <Box className=' my-2 mx-5'>
                        <p><span className='text-[10px] '>Trip detail :</span></p>
                        <p><span className='text-[10px] '>Pick-up point :</span> <span className=' py-10 text-xs'>{tripData[0]?.startLocation ? tripData[0]?.startLocation : ''}</span></p>
                        <p><span className='text-[10px] '>Destination :</span> <span className=' py-10 text-xs'> {tripData[0]?.destination ? tripData[0]?.destination : ''}</span></p>
                        <p><span className='text-[10px] '>Approx. distance :</span> <span className=' py-10 text-xs'> {tripData[0]?.distance}</span></p>
                        <p><span className='text-[10px] '>Approx. duration :</span> <span className=' py-10 text-xs'> {tripData[0]?.duration}</span></p>
                        <p><span className='text-[10px] '>Schedule:</span> <span className=' py-10 text-xs'> {tripData[0]?.schedule}</span></p>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}


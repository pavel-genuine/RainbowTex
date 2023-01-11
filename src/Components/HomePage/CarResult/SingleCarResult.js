import * as React from 'react';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SingleCarResult() {

    return (
        <Link to={`/car-detail`}>
            <Box sx={{ boxShadow: 3 }} className='relative ml-2 rounded bg-white'>
                <Box className='' sx={{ display: 'flex' }}>
                    <Box className='px-3 py-1 grid grid-cols-2 md:grid-cols-3 h-[100px]' >
                        <Box className='md:col-span-2  pt-3'>
                            <p className='text-xs text-primary font-semibold'>
                                Toyota Camry 2021
                            </p>
                            <p className='text-[grey] text-[11px]'>
                                5 Seats <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> AC
                            </p>
                            <p className='text-[11px] flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                Location
                            </p>

                            <p className='text-[11px] flex my-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-[orange] mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                4.5 (26)
                            </p>

                        </Box>

                        <Box>
                            <img className='w-[160px] h-[115px]' src="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/CamryModelImage.jpg&w=350&h=251&q=90&c=1" alt="" />
                       
                        </Box>

                    </Box>
                </Box>
                <Divider></Divider>
                <p className=' mx-3 font-semibold py-4 text-sm '> ৳ 3000</p>
            </Box>

        </Link>
    );
}
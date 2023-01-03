import * as React from 'react';
import Box from '@mui/material/Box';

import CardMedia from '@mui/material/CardMedia';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function CarResult() {
  return (
    <Box sx={{boxShadow: 3}} className='relative ml-2 rounded bg-white'>
      <Box className='h-[120px]' sx={{ display: 'flex' }}>
        <CardMedia
          className=''
          component="img"
          sx={{ width: 140,borderRadius:'5px 0 0 5px' }}
          image="https://kalingatv.com/wp-content/uploads/2022/03/Toyota-cars-price-hike-1.jpg"
          alt="Live from space album cover"
        />
        <Box className='pl-3 py-2' sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: '1 0 auto' }}>
            <p className='text-[11px] text-primary font-semibold mb-1'>
              Mitshubishi Ex-lancer 2022
            </p>
            <span className='bg-primary bg-opacity-20 text-primary px-2 py-1 rounded-full text-[12px] '>3000 BDT</span>

            <p className='text-[grey] text-[10px]'>
              5 Seats <FiberManualRecordIcon sx={{ width: 5, marginInline: .2 }}></FiberManualRecordIcon> AC
            </p>
            <p className='text-[10px] flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Location
            </p>

            <p className='text-[10px] flex my-1 absolute left-1 top-1 px-1 bg-white rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-[orange] mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              4.5 (26)
            </p>

          </Box>

        </Box>
      </Box>
    </Box>
  );
}
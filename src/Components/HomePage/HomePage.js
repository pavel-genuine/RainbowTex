import React from 'react'
import { useState } from 'react'
import FindCars from './FindCars/FindCars'
import img from '../../assets/doc.jpg'

const HomePage = ({ open, setOpen, setTripData, setPickupPlace, setDestinationPlace }) => {

  return (
    <div className=''>
      <FindCars setTripData={setTripData} open={open} setOpen={setOpen} setPickupPlace={setPickupPlace} setDestinationPlace={setDestinationPlace}></FindCars>
      {/* <HomeSliders></HomeSliders>  */}
      {/* <SingleSliders></SingleSliders>        */}
      {/* <PassengerProfile></PassengerProfile> */}


      {/* <div className=' bg-primary h-[200px] w-[200px] p-[70px] mx-40'>
        <p className='relative mb-[10px] md:mb-[20px]'>
          <span className='text-primary md:text-white text-2xl md:text-3xl  '>
            গতি</span> <br />

          <span className='font-Allura text-[orange] absolute top-[20px] md:top-[25px] left-[10px] text-xl  md:text-xl'>
            Rentals
          </span>
        </p>
      </div> */}
{/* 
      <div className=' bg-white  h-[800px] flex justify-center items-center'>
        <div className='relative mb-[10px] md:mb-[20px] flex justify-center items-center'>
          <span className='text-primary text-5xl md:text-3xl absolute top-[0px] left-[66px]'>G</span>
          <img className='w-[15%] mt-1' src="https://i.ibb.co/QFg5mmT/download.png" alt="" />
          <span className='text-primary text-5xl md:text-3xl absolute top-[0px] left-[113px]  '>ti</span> <br />

          <span className='font-Allura text-black absolute top-[43px] left-[41.5%] md:top-[28px]  text-xl  md:text-lg'>
            Rentals
          </span>
        </div>
      </div> */}

      {/* <div className=' bg-[#fcfcfc]  h-[1800px] flex justify-center items-center'>
        <img className='w-[25%]' src="https://i.ibb.co/1XZmRXM/Screenshot-2023-03-08-144015.png" alt="" srcset="" />

      </div> */}
    </div>
  )
}

export default HomePage
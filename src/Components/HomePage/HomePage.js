import React from 'react'
import { useState } from 'react'
import FindCars from './FindCars/FindCars'

const HomePage = ({open,setOpen,setTripData,setPickupPlace,setDestinationPlace}) => {

  return (
    <div className='pb-40 space-y-4'>
      <FindCars setTripData={setTripData} open={open} setOpen={setOpen} setPickupPlace={setPickupPlace} setDestinationPlace={setDestinationPlace}></FindCars>
      {/* <HomeSliders></HomeSliders>  */}   
      {/* <SingleSliders></SingleSliders>        */}
      {/* <PassengerProfile></PassengerProfile> */}
    </div>
  )
}

export default HomePage
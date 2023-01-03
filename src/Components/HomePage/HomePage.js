import React from 'react'
import GoRentalMap from '../GoogleMap/GoRentalMap'

import HomeSliders from '../HomeSliders/HomeSliders'
import SingleSliders from '../HomeSliders/SingleSide'
import Navbar from '../Navbar/Navbar'
import FindCars from './FindCars/FindCars'

const HomePage = ({open,setOpen}) => {


  return (
    <div className='pb-40 space-y-4'>
      <FindCars open={open} setOpen={setOpen}></FindCars>
      {/* <HomeSliders></HomeSliders>  */}   
      <SingleSliders></SingleSliders>       
    </div>
  )
}

export default HomePage
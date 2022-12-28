import React from 'react'
import GoRentalMap from '../GoogleMap/GoRentalMap'

import HomeSliders from '../HomeSliders/HomeSliders'
import SingleSliders from '../HomeSliders/SingleSide'
import Navbar from '../Navbar/Navbar'
import FindCars from './FindCars/FindCars'

const HomePage = () => {

  const [open, setOpen] = React.useState(false);

  // console.log(open,'open');


  return (
    <div className='pb-40'>
      <FindCars open={open} setOpen={setOpen}></FindCars>
      {/* <HomeSliders></HomeSliders>  */}   
      <SingleSliders></SingleSliders>       
    </div>
  )
}

export default HomePage
import React from 'react'
import AuthHome from '../Authentication/AuthHome'
import Navbar from '../Navbar/Navbar'
import CarResult from './CarResult/CarResult'
import FindCars from './FindCars/FindCars'

const HomePage = () => {

  const [open, setOpen] = React.useState(false);

  // console.log(open,'open');
      const handleOpenDrawer=()=>{
         setOpen(()=>true)
      }

  return (
    <div>
      <Navbar open={open} setOpen={setOpen}></Navbar>
      <FindCars open={open} setOpen={setOpen}></FindCars>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 space-y-5 md:space-y-0  md:w-[90%] w-[95%] mx-auto'>
        <CarResult></CarResult>
        <CarResult></CarResult>
        <CarResult></CarResult>
        <CarResult></CarResult>
        <CarResult></CarResult>
        <CarResult></CarResult>
      </div>
    </div>
  )
}

export default HomePage
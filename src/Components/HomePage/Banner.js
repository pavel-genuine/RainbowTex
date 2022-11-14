import React from 'react'
import "./Banner.css"

const Banner = ({ updatedBanner }) => {
  return (
    <div  className=" md:h-[85vh] h-[40vh]  w-[98vw] mx-auto relative">
      <img className='md:h-[85vh] h-[40vh] w-[98vw] mx-auto' src={updatedBanner?.name ? updatedBanner?.img : 'https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b%22'} alt="" />
      <div className='absolute md:pt-28 p-5 md:pl-16 md:top-[0%] top-[0%] md:h-[85vh] h-[40vh] text-white bg-gradient-to-r from-black'>
        <h1 className='md:text-4xl text-2xl font-semibold'>{updatedBanner?.name}</h1>
        <p className='md:text-lg md:w-[55%] md:my-5 my-2'>{updatedBanner?.detail}</p>

        {
          updatedBanner?.detail && <button className='md:px- md:py-3 px-2 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[#e50914] hover:bg-[#e50914] cursor-pointer mt-4 mb-2'>Subscribe Now</button>
        }
      </div>
    </div>
  )
}

export default Banner
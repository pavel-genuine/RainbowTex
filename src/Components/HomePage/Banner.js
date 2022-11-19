import React from 'react'
import { Link } from 'react-router-dom'
import "./Banner.css"

const Banner = ({ updatedBanner }) => {

  console.log(updatedBanner, 'banner');

  return (
    <div className="w-[98vw] mx-auto relative">
      <img className='md:h-[100vh] h-[40vh] w-[99vw] brightness-125 contrast-125' src={updatedBanner?.name ? updatedBanner?.img : 'https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b%22'} alt="" />
      
      <div className='absolute w-[98vw] md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white '>
        <div className='absolute w-[98vw] md:pt-[13%] pt-[30%] md:pt-60 p-5 md:pl-28 md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white bg-gradient-to-t from-[#181818]' >
          <h1 className='md:text-6xl text-2xl font-semibold'>{updatedBanner?.name}</h1>
          <p className='md:text-lg md:w-[40%]  md:my-5 my-2'>{updatedBanner?.detail}</p>

          <div className='flex space-x-10'>
            {
              updatedBanner?.detail &&


              <button className='md:py-3 px-2 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[#e50914] hover:bg-[brown] cursor-pointer mt-4 mb-2'>Subscribe Now</button>

            }
            {
              updatedBanner?.detail &&
              <Link to={`movie-detail/${updatedBanner?.id}`}>
                <button className='flex justify-center items-center md:py-3 px-4 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[blue] hover:bg-[navy] cursor-pointer mt-4 mb-2'>Play Now
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </button>
              </Link>
            }
  
          </div>
       
        </div>
        <div className='hidden md:blockh-[10vh] bg-opacity-90  bg-gradient-to-t from-[#181818] bg-[red] w-[98vw] ml-1'>

</div>
      </div>
 
    </div>
  )
}

export default Banner
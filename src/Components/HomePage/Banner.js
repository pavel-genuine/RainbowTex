import React from 'react'
import "./Banner.css"

const Banner = ({ updatedBanner }) => {
  return (
    <div style={{backgroundImage: `url(${'https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg?w=1380&t=st=1668365061~exp=1668365661~hmac=70f610ca22e1b138fe3bda7d9c9927de8eedb5821d51547272fbcf3bd121f371'
        })`}} className="bg-cover h-[80vh] w-[96vw] mx-auto relative">

      <img className='h-[80vh] w-[96vw] mx-auto' src={updatedBanner && updatedBanner?.img} alt="" />
      <div className='absolute top-[40%] left-[5%] text-white'>
        <h1 className='text-4xl'>{updatedBanner?.name}</h1>
        <p className='text-lg w-[70%] my-5'>{updatedBanner?.detail}</p>
        <button className='px-4 py-3 font-semibold text-lg rounded w-full max-w-xs text-white bg-[#e50914] hover:bg-[#e50914] cursor-pointer mt-4 mb-2'>Subscribe Now</button>
      </div>

    </div>
  )
}

export default Banner
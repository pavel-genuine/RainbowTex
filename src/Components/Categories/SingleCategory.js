import React from 'react'

const SingleCategory = ({ movie, detectClicked }) => {

    const handleClicked = () => {
        detectClicked(movie)
    }

    return (
        <div title={movie?.detail} onClick={handleClicked} className=' cursor-pointer'>
            <img  className="md:w-[95%] w-[95%] mx-auto  border-white" src={movie?.img} alt="" />
            <div className=' left-[5%] text-white p-2'>
                <h1 className='md:font-semibold'>{movie?.name}</h1>
                {/* <p className='text-w-[70%] my-1'>{movie?.detail?.slice(0,50)}...</p> */}
            </div>
        </div>)
}

export default SingleCategory
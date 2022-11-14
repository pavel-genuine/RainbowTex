import React from 'react'

const SingleCategory = ({ movie, detectClicked }) => {

    const handleClicked = () => {
        detectClicked(movie)
    }

    return (
        <div title={movie?.detail} onClick={handleClicked} className='relative cursor-pointer'>
            <img  className="w-80 mx-2  border-white" src={movie?.img} alt="" />
            <div className='absolutop-[10%] left-[5%] text-white p-2'>
                <h1 className='text font-semibold'>{movie?.name}</h1>
                {/* <p className='text-w-[70%] my-1'>{movie?.detail?.slice(0,50)}...</p> */}
            </div>
        </div>)
}

export default SingleCategory
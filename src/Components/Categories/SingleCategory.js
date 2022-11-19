import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './icon.css'

const SingleCategory = ({ movie, detectClicked }) => {

    const [arrow, setArrow] = useState(false)
    const [mark, setMark] = useState(false)
    const [saved, setSaved] = useState(false)
    const [unsaved, setUnsaved] = useState(true)

    const handleSaved = () => {
        setSaved(true)
        setUnsaved(false)
    }

    const unSavedHandler = () => {
        setSaved(false)
        setUnsaved(true)
        const data = { saved: false, user: null }


    }
    const showArrow = () => {
        setArrow(true)
    }
    const showMark = () => {
        setMark(true)
    }
    const handleClicked = () => {
        detectClicked(movie)
    }

    return (
        <div onClick={handleClicked} className='promo relative cursor-pointer'>
            <img className="promo md:w-[95%] w-[95%] mx-auto  border-white hover:opacity-70" src={movie?.img} alt="" />

            <div className=' left-[5%] text-white p-2'>
                <h1 className='md:font-semibold'>{movie?.name}
                    <div className=" icons text-black ">
                            <Link to={`/movie-detail/${movie?.id}`}>
                            <span title='View Detail'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`icon absolute rounded-full h-6 w-6  bottom-[55%] left-[45%] `}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>
                            </span>
                        </Link>
                    </div>
                </h1>


                {/* <p className='text-w-[70%] my-1'>{movie?.detail?.slice(0,50)}...</p> */}
            </div>
        </div>)
}

export default SingleCategory
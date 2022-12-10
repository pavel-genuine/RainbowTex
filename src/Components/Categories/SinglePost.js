import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoryAdd } from '../../redux/features/postSection/postCategorySlice'
import useAllCategories from '../Shared/useAllCategories'
import './icon.css'

const SinglePost = ({ movie }) => {




    return (

        movie?.isActive &&
        <div className='promo relative cursor-pointer'>
            {
                movie?.thumbnail || movie?.videoCover ? <img className="promo  w-[95%] h-[130px] lg:h-[200px] mx-auto  border-white hover:opacity-70" src={movie?.thumbnail ? movie?.thumbnail?.cdnUrl : movie?.videoCover?.cdnUrl} alt="" />
                    :
                    <img className="promo  w-[95%] lg:h-[200px] h-[130px] mx-auto  border-white hover:opacity-70" src={'https://i.ibb.co/R6Y4CQ3/1-white-1.png'} alt="" />

            }

            <div className=' left-[5%] text-white p-2'>
                <h1 className='md:font-semibold'>{movie?.title}
                    <div className=" icons text-black ">
                        <Link to={`/movie-detail/${movie?._id}`}>
                            <span title='View Detail'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`icon absolute rounded-full h-6 w-6  bottom-[55%] left-[45%] `}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </h1>


            </div>
        </div>

    )
}

export default SinglePost
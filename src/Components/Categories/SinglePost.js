import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoryAdd } from '../../redux/features/postSection/postCategorySlice'
import useAllCategories from '../Shared/useAllCategories'
import './icon.css'

const SinglePost = ({movie}) => {

    // const handleClicked = () => {
    //     detectClicked(movie)
    // }
    // const { postCategory} = useSelector(state => state?.addPostCategory)
    // const dispatch = useDispatch()

    // useEffect(()=>{

    //     dispatch(categoryAdd({

    //         postId:movie?._id,
    //         categoryId:cateId,
    //     }))
    // },[])

    // const movie =postCategory?.post
    

    return (
        <div  className='promo relative cursor-pointer'>
            <img className="promo md:w-[95%] w-[95%] mx-auto  border-white hover:opacity-70" src={movie?.thumbnail? movie?.thumbnail?.cdnUrl :'https://i.ibb.co/R6Y4CQ3/1-white-1.png' } alt="" />

            <div className=' left-[5%] text-white p-2'>
                <h1 className='md:font-semibold'>{movie?.title}
                    <div className=" icons text-black ">
                            <Link to={`/movie-detail/${movie?._id}`}>
                            <span title='View Detail'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`icon absolute rounded-full h-6 w-6  bottom-[55%] left-[45%] `}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>
                            </span>
                        </Link>
                    </div>
                </h1>


            </div>
        </div>)
}

export default SinglePost
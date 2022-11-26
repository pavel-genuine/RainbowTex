import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { homeCategory } from '../../api/api'

import useHomeCategories from '../Shared/hooks/useHomeCategories'
import HomePosts from './HomePosts'
import SinglePost from './SinglePost'
import { settings } from './slickSetting'

const HomeCategories = ({ filteredCategory }) => {

    // const settings = {
    //     // infinite: true,
    //     slidesToShow: 5,
    //     rows: 1,
    //     // slidesToScroll: 2,
    //     // accessibility:true,
    //     swipeToSlide: true,
    //     // autoplay: true,
    //     // speed: 7000,
    //     arrows: false,
    //     // autoplaySpeed: 5000,
    //     cssEase: "linear",
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 5,
    //                 // slidesToScroll: 2,
    //                 // infinite: true,
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 // initialSlide: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 2,
    //                 // slidesToScroll: 1
    //             }
    //         }
    //     ]
    // };

    const { category } = useHomeCategories()
    

    return (
        <div>
            {filteredCategory?._id ?
                <div>
                    {
                        filteredCategory?.posts?.length ? <div>
                            <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{filteredCategory?.categoryName} </h1>

                            <Slider {...settings}>
                                {
                                    filteredCategory?.posts?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                                }
                            </Slider>
                        </div> :
                            <div>
                                {
                                    <div>
                                        <div className='text-slate-400 text-3xl mx-auto w-96 text-center'>
                                            <h1 className='text-white font-semibold my-10 text-4xl'>{filteredCategory?.categoryName} </h1>

                                            No Movies Available ! <br />
                                            Please Try another Category
                                        </div>
                                    </div>
                                }
                            </div>
                    }
                </div>
                :
                !filteredCategory?._id &&
                category?.length > 0 &&
                category?.map(cate =>{
                    return cate?.posts.length<5 && cate?.posts.length>0 ?
                    <div>
                        <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{cate?.categoryName} </h1>

                        <div className='grid md:grid-cols-5 grid-cols-2'>
                            {
                                cate?.posts?.map((movie) => <div className='col-span-1'><SinglePost key={movie?._id} movie={movie}></SinglePost></div>)
                            }
                        </div>
                    </div>
                    :
                    cate?.posts.length>0 && 
                    <div>
                        <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{cate?.categoryName} </h1>

                        <Slider {...settings}>
                            {
                                cate?.posts?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                            }
                        </Slider>
                    </div>
                    
                })
            }

        </div>
    )
}

export default HomeCategories
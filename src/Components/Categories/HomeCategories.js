import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { homeCategory } from '../../api/api'
import useHomeCategories from '../Shared/hooks/useHomeCategories'
import HomePosts from './HomePosts'
import SinglePost from './SinglePost'

const HomeCategories = () => {

    const settings = {
        // infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        // accessibility:true,
        // arrows:true,
        swipeToSlide: true,
        // autoplay: true,
        // speed: 7000,
        arrows: false,
        // autoplaySpeed: 5000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    // infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { category } = useHomeCategories()
    console.log('home cate ll', category);

    return (
        <div>
            {category?.length &&
                category?.map(cate => cate?.posts.length &&                     
                    <div>
                        <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{cate?.categoryName} </h1>

                        <Slider {...settings}>
                            {
                                cate?.posts?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                            }
                        </Slider>
                    </div>
                )}
        </div>
    )
}

export default HomeCategories
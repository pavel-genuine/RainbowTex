import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleCategory from './SingleCategory';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movies } from '../allMovies/allMovies';
import usePosts from '../Shared/usePosts';

const Categories = ({ handleBanner, quantity }) => {

  const [clickedPoster, setClickedPoster] = useState({})


  const {isLoading, error, posts }=usePosts()

  const settings = {
    // infinite: true,
    slidesToShow: 5,
    // slidesToScroll: 2,
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



  const detectClicked = (data) => {
    setClickedPoster(data)
    handleBanner(data)
  }


  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='md:mx-1 mx-auto mt-10 z-10 '>

      <div className=''>

        {quantity == 2 ?
          <div className='md:pt-0 bg-[#181818] px-5 md:px-0'>

            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  posts.map((movie, index) => <SingleCategory key={movie?._id} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>
            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  posts?.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>


          </div> :
          <div className='md:pt-0 bg-[#181818] px-5 md:px-0'>

            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 md:mx-2 md:mt-10 mb-4 z-40'>Comedies : </h1>

              <Slider {...settings}>

                {
                  posts?.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>

            </div>
            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>
            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>
            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>
            <div >
              <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>Comedies : </h1>

              <Slider {...settings}>

                {
                  movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

                }
              </Slider>
            </div>

          </div>
        }
      </div>
    </div>
  )
}

export default Categories
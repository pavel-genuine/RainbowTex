import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import Marquee from "react-fast-marquee";
import SingleCategory from './SingleCategory';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { movies } from '../allMovies/allMovies';

const Categories = ({ handleBanner }) => {

  const [clickedPoster, setClickedPoster] = useState({})

  const settings = {
    infinite: true,
      slidesToShow: 5,
      slidesToScroll: 4,
      autoplay: true,
      speed: 5000,
      arrows:false,
      autoplaySpeed: 5000,
      cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  // const fetcher = async () => {
  //   const data = axios.get('movie.json')
  //   // console.log(data, 'data');
  //   return (await data).data
  // }

  // let { data: movies, isLoading } = useQuery(['movies'], () => fetcher())
  // console.log(movies, 'movie');

  const detectClicked = (data) => {
    setClickedPoster(data)
    handleBanner(data)
  }


  // if (isLoading) {
  //   return <p>Loading...</p>
  // }

  return (
    <div className='md:mx-1 mx-2 mt-10 z-10 '>

      <div className=''>

        <div className='md:pt-28 bg-[#181818] px-5 md:px-0'>

          <div >
            <h1 className='text-white font-semibold text-lg md:text-xl mt-5 md:mx-2 md:mt-10 mb-4 z-40'>Comedies : </h1>

            <Slider {...settings}>

              {
                movies?.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

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
      </div>
    </div>
  )
}

export default Categories
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import usePosts from '../Shared/usePosts';
import useAllCategories from '../Shared/useAllCategories';
import HomeCategories from './HomeCategories';


const Categories = ({ handleBanner, filteredCategory,searchText }) => {


  const{category} =useAllCategories()

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
      <HomeCategories searchText={searchText} filteredCategory={filteredCategory}></HomeCategories>
    </div>
  )
}

export default Categories
import React from 'react'
import Slider from 'react-slick';
import SinglePost from './SinglePost';

const HomePosts = ({posts}) => {

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

  return (
   <div>
    {
     
            <Slider {...settings}>
        
              {
                posts.map((movie) => <SinglePost key={movie?._id} movie={movie} ></SinglePost>)
        
              }
            </Slider>

    }
   </div>
  )
}

export default HomePosts
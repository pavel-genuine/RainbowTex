import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import useAllFeatured from '../Shared/useAllFeatured';
import "./Banner.css"

const Banner = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 3000,
    autoplaySpeed: 3000,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const { error, featured, isLoading } = useAllFeatured()

  return (
    <div className="w-[98vw] mx-auto md:h-[95vh] h-[50vh] ">
      {
        !localStorage?.getItem('loginToken') && localStorage?.getItem('email') && <div className="toast z-20 toast-top toast-end pt-20">
          <div className="alert alert-error text-white font-semibold">
            <div>
              <span>Please verify your email, else your signIn will be restricted !</span>
            </div>
          </div>
        </div>
      }


      {

        featured?.length &&

        <Slider {...settings}>
          {
            featured?.map((movie) => <div>

              <img className=' md:h-[95vh] h-[50vh] w-[100%]' src={movie?.videoCover?.cdnUrl} alt="" />

              <div className='absolute w-[98vw] md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white '>
        <div className='absolute w-[98vw] md:pt-[13%] pt-[30%] md:pt-60 p-5 md:pl-28 md:top-[0%] top-[0%]  md:h-[95vh] h-[50vh] text-white bg-gradient-to-t from-[#181818]' >
          <h1 className='md:text-6xl text-2xl font-semibold'>{movie?.title}</h1>
          <p className='md:text-lg md:w-[40%]  md:my-5 my-2'>{movie?.description?.slice(0,100)}...</p>

          <div className='flex md:space-x-10 space-x-5'>
            {
            


              <button className='md:py-3 px-2 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[#e50914] hover:bg-[brown] cursor-pointer mt-4 mb-2'>Subscribe Now</button>

            }
            {
              
              <Link to={`movie-detail/${movie?.postId}`}>
                <button className='flex justify-center items-center md:py-3 md:px-4 px-2 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[blue] hover:bg-[navy] cursor-pointer mt-4 mb-2'>Play Now
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </button>
              </Link>
            }

          </div>

        </div>
       
      </div>

            </div>)
          }
        </Slider>

      }

     

    </div>
  )
}

export default Banner
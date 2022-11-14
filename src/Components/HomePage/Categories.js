import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import Marquee from "react-fast-marquee";
import Footer from '../Footer/Footer';
import SingleCategory from './SingleCategory';

const Categories = ({ handleBanner }) => {

  const [clickedPoster, setClickedPoster] = useState({})

  const fetcher = async () => {
    const data = axios.get('movie.json')
    // console.log(data, 'data');
    return (await data).data
  }

  const detectClicked = (data) => {
    setClickedPoster(data)
    handleBanner(data)
  }

  let { data: movies, isLoading } = useQuery(['movies'], () => fetcher())
  // console.log(movies, 'movie');

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='md:mx-2 mx-2 '>

      <div className='relative'>

        <div className='md:absolute top-[-7%]'>
          <h1 className='text-white mx-2 font-semibold text-lg md:text-xl  mt-5 md:mt-10 mb-4'>Award-Winning Films : </h1>

          <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} gradientWidth='0'>

            {
              movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

            }
          </Marquee>
        </div>


        <div className='md:pt-28 bg-[#181818]'>

          <div >
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='mx-2 text-white font-semibold text-lg md:text-xl md:mt-10 mt-5 mb-4'>Action & Adventure : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
          <div>
            <h1 className='text-white font-semibold text-lg mx-2 md:text-xl mt-5 md:mt-10 mb-4'>Comedies : </h1>

            <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right" gradientWidth='0'>

              {
                movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

              }
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import Marquee from "react-fast-marquee";
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
    <div className='mx-5'>
      <h1 className='text-white font-semibold text-xl mx-5 mt-10 mb-4'>Award-Winning Films : </h1>

      <div>
        <Marquee speed={30} pauseOnClick={true} pauseOnHover={true}>

          {
            movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

          }
        </Marquee>
        <h1 className='text-white font-semibold text-xl mx-5 mt-10 mb-4'>Comedies : </h1>

        <Marquee speed={30} pauseOnClick={true} pauseOnHover={true} direction="right">

        {
            movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

          }
        </Marquee>
        <h1 className='text-white font-semibold text-xl mx-5 mt-10 mb-4'>Action & Adventure : </h1>

        <Marquee speed={30} pauseOnClick={true} pauseOnHover={true}>

        {
            movies.map((movie, index) => <SingleCategory key={index} movie={movie} detectClicked={detectClicked}></SingleCategory>)

          }
        </Marquee>
      </div>

    </div>
  )
}

export default Categories
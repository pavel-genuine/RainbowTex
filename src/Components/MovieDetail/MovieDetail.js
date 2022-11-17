import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
// import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton, LoadingSpinner } from 'video-react';
import Footer from '../Footer/Footer';
import { movies } from '../allMovies/allMovies';

const MovieDetails = () => {

    const { id } = useParams()

    console.log(id, 'id');
    const fetcher = async () => {
        const data = axios.get('movie.json')
        // console.log(data, 'data');
        return (await data).data
    }

    // let { data, isLoading } = useQuery(['movies'], () => fetcher())
    console.log(movies, 'movie');

    const movie = movies?.find(item => id == item?.id);
    console.log(movie, 'movi');

    if (!movies.length) {
        return <p>loading...</p>
    }


    return (
        <div className='mx-auto bg-[#181818] text-slate-200'>
            <div className=" h-[40vh]  w-[98vw] mx-auto relative mb-40 md:mb-60">
                <img className='md:h-[100vh] h-[40vh] w-[100vw] ' src={movie?.img} alt="" />
                <div className='absolute md:pt-[13%] pt-[20%] p-5 md:pl-14 md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white bg-gradient-to-r from-black'>
                    <h1 className='md:text-4xl text-2xl font-semibold'>{movie?.name}</h1>
                    <p className='md:text-lg md:w-[55%] md:my-5 my-2'>{movie?.detail}</p>

                    <div className='flex space-x-10'>
                        {

                            <button className='md:py-3 px-16 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[brown] hover:bg-[#e50914] hover:bg-[brown] cursor-pointer mt-4 mb-2'>Join Now</button>
                        }

                    </div>
                    <div className='md:flex items-center'>

                        <p className='mb-3 mt-5'>
                            <p className='text-[brown] text-2xl font-semibold'>Release Date  </p>

                            <p className='text-2xl font-semibold'>{movie?.release}</p>
                        </p>

                        <p className='mt-3 md:ml-20'>
                            <p className='text-[brown] text-2xl font-semibold'>IMDb Rating</p>
                            <p className='text-2xl font-semibold'>{movie?.rating}</p>
                        </p>
                    </div>

                </div>
            </div>

            <div>

            </div>

            <div className='md:mt-[32%] md:pl-16 pl-5'>
                <p className='text-2xl font-semibold'>Videos || {movie?.name}  </p>

                <Player className='rounded-lg mt-5 mb-10'
                    playsInline
                    poster={movie?.img}
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    fluid={false}
                    width={'40%'}
                    height={400}
                >
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={false}>
                        <ReplayControl seconds={10} order={2.2} />
                        <ForwardControl seconds={10} order={3.2} />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={6.1} />
                    </ControlBar>
                </Player>
                <p className='py-5 '>
                    <p className='text-[brown] text-2xl font-bold mb-3'>More Detail:  </p>

                    <div className='md:flex items-center'>

                        <p className='mb-3 '>
                            <p className='text-[brown] text-2xl font-semibold'>Cast  </p>

                            <p className=''>AAAAAAAAAAA</p>
                        </p>

                        <p className='mb-3 md:ml-20'>
                            <p className='text-[brown] text-2xl font-semibold'>Genres</p>
                            <p className=''>BBBBBBBBBBB</p>
                        </p>
                    </div>

                    <p className='text-lg font w-[60%] text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt ducimus libero, ut omnis beatae blanditiis minus. Consequuntur sint ipsam impedit dolor. Possimus officiis nihil, asperiores molestias saepe incidunt ea sequi?</p>
                </p>

            </div>
            <Footer></Footer>

        </div>
    );
};

export default MovieDetails;
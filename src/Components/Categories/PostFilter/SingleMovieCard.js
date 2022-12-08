import { Link } from "react-router-dom";
import React from 'react'

const SingleMovieCard = ({ movie }) => {

    // console.log(movie,'mov');

    return (
        <Link to={`/movie-detail/${movie?._id}`}>
        <div className="border-b border-slate-800 pb-5 w-[90%] md:w-[100%] md:pl-0 pl-5">
            <article className="flex  my-3 flex-col md:flex-row md:items-start md:space-x-6">
                <img loading='lazy' src={movie?.thumbnail?.cdnUrl ? movie?.thumbnail?.cdnUrl : 'https://i.ibb.co/4SL78cW/1.jpg'} alt="" className="flex-none w-60  rounded-md bg-slate-100" />

                <div className="min-w-0 relative flex-auto">
                    <h2 className="font-semibold text-slate-200 truncate text-md">{movie?.title}</h2>


                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">


                        <div className=' flex md:flex-col flex-row'>
                            <dd className="px-1.5 ring-1 ring-slate-200 rounded flex">
                                <svg width="16" height="20" fill="currentColor">
                                    <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                                </svg>
                                <span className="mx-1">
                                    Rating : {movie?.averageRating}
                                </span>                            </dd>
                        </div>
                        <div className=' flex md:flex-col flex-row my-2'>
                            <dd className="px-1.5 ring-1 ring-slate-200 rounded flex">
                                <span className="mx-1">
                                    IMDb Rating : {movie?.imdbRating}
                                </span>                            </dd>
                        </div>
                        <div className="flex-none w-full mt-2 font-normal mt-5">
                            <Link to={`/movie-detail/${movie?._id}`}><button className='btn btn-xs border-none bg-[brown]'>Detail</button>
                            </Link>
                        </div>
                    </dl>
                </div>
            </article>
        </div>
        </Link>
    )
}

export default SingleMovieCard

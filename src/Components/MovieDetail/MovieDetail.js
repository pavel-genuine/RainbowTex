import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Player, BigPlayButton, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton, LoadingSpinner } from 'video-react';
import Footer from '../Footer/Footer';
import { movies } from '../allMovies/allMovies';
import { useForm } from 'react-hook-form';
import Categories from '../Categories/Categories';
import './movieDetail.css'
import { singlePostGet } from '../../redux/features/postSection/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { commentAdd } from '../../redux/features/commentSlice';
import { base_url, getSinglePost } from '../../api/api';

const MovieDetails = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const { id } = useParams()

    const { isLoading, error, post: movie } = useSelector(state => state?.singlePost)
    const { comment: newComment } = useSelector(state => state?.commentAdding)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(singlePostGet(id))
    }, [])


    console.log(movie, 'mov');

    const [comment, setComment] = useState(false)
    // const [love, setLove] = useState(false)
    // let [count, setCount] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    // const handleLove = () => {
    //     setLove(true)
    //     setCount(() => count++)
    //     console.log(count, 'count');
    // }
    localStorage.getItem('userId')

    const onSubmit = async (data) => {

        setComment(data?.comment)
        const newComment = {
            postId: movie?._id,
            comment: data?.comment,
            userName: localStorage.getItem('email'),
            userId: localStorage.getItem('userId')
        }
        dispatch(commentAdd(newComment))
    }

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <div className='mx-auto bg-[#181818] text-slate-200'>
            <div className=" h-[40vh]  w-[98vw] mx-auto relative mb-40 md:mb-60">
                <img className='md:h-[100vh] h-[40vh] w-[100vw] brightness-125 contrast-125' src={movie?.videoCover?.cdnUrl ? movie?.videoCover?.cdnUrl :'https://i.ibb.co/R6Y4CQ3/1-white-1.png'} alt="" />
                <div className='absolute w-[98vw] md:pt-[13%] pt-[30%] md:pt-60 p-5 md:pl-28 md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white bg-gradient-to-t from-[#181818]'>
                    <h1 className='md:text-6xl text-2xl font-semibold'>{movie?.title}</h1>
                    <p className='md:text-lg md:w-[40%] md:my-5 my-2'>{movie?.description}</p>

                    <div className='flex space-x-10'>
                        <button className='md:py-3 px-16 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[#e50914] hover:bg-[brown] cursor-pointer mt-4 mb-2'>Join Now</button>
                    </div>
                    <div className='md:flex items-center'>

                        <div className='mb-3 mt-5'>
                            <p className='text-[#e50914] text-2xl font-semibold'>Release Date  </p>

                            {/* <p className='text-2xl font-semibold'>{movie?.release}</p> */}
                        </div>

                        <div className='mt-3 md:ml-20'>
                            <p className='text-[#e50914] text-2xl font-semibold'>IMDb Rating</p>
                            <p className='text-2xl font-semibold'>{movie?.ratings}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div>

            </div>

            <div className='md:mt-[32%] md:pl-16 pl-5 '>
                <p className='text-2xl font-semibold'>Videos || {movie?.title}  </p>

                <Player className='rounded-lg mt-5 mb-10 hidden md:block'
                    playsInline
                    poster={movie?.videoCover?.cdnUrl }
                    src={movie?.videos?.length && movie?.videos[0]?.url}
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


                {
                    <video className='md:hidden' width="320" height="240" controls>
                        <source src={movie?.videos?.length && movie?.videos[0]?.url} />
                    </video>
                }
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-[red] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-[red] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-[red] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-[red] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-[red] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>

                </div>
                <div className='py-5 '>
                    <p className='text-[#e50914] text-2xl font-bold mb-3'>More Detail:  </p>

                    <div className='md:flex items-center'>

                        <div className='mb-3 '>
                            <p className='text-[#e50914] text-2xl font-semibold'>Cast  </p>

                            <p className=''>AAAAAAAAAAA</p>
                        </div>

                        <div className='mb-3 md:ml-20'>
                            <p className='text-[#e50914] text-2xl font-semibold'>Genres</p>
                            <p className=''>BBBBBBBBBBB</p>
                        </div>
                    </div>

                    <p className='text-lg font md:w-[60%] w-80  text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt ducimus libero, ut omnis beatae blanditiis minus. Consequuntur sint ipsam impedit dolor. Possimus officiis nihil, asperiores molestias saepe incidunt ea sequi?</p>
                </div>

                <div className=' md:w-96 w-80 '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="pt-10 space-y-2 pb-5 ">
                            <header className="font-semibold text-xl mb-5">Comment here</header>
                            <div className="comments-container  border-y  py-4">
                                <div>
                                    <p className="font-medium flex items-center"> <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>

                                    <div className='grow-wrap'>
                                        <textarea
                                            placeholder="Comment"
                                            id="text" name="text"
                                            // className="outline-0 pt-3 font-normal"
                                            className=" outline-0 p-3 font-normal  bg-slate-700 bg-opacity-50 my-5 rounded-lg  block w-full"
                                            {...register("comment")}>
                                        </textarea>
                                    </div>
                                    <input className="btn btn-xs bg-[brown] border-0 text-white " type="submit" value="response" />

                                </div>
                            </div>
                        </div>
                    </form>


                    {
                        comment &&
                        <div className='my-3 m-2'>
                            <p className="font-medium flex items-center"> <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>

                            <p className='m-3'> {comment}</p>
                        </div>
                    }

                    <div className='m-2 border-b'>
                        <div className='my-3'>{movie?.comments?.map(item =><div> 
                            <p className="font-medium flex items-center"> <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>
                            <p className='m-3 bg-slate-800 p-2 rounded'> {item?.comment}</p>
                        </div>)}</div>
                    </div>


                </div>

            </div>
            {/* <Categories quantity={2}></Categories> */}
            <Footer></Footer>
        </div>
    );
};

export default MovieDetails;
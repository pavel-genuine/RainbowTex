
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Footer/Footer';
import { useForm } from 'react-hook-form';
import './movieDetail.css'
import { singlePostGet } from '../../redux/features/postSection/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { commentAdd, commentEdit, commentRemove } from '../../redux/features/commentSlice';
import useHomeCategories from '../Shared/hooks/useHomeCategories';
import Slider from 'react-slick';
import { settings } from '../Categories/slickSetting';
import SinglePost from '../Categories/SinglePost';
import { ratingAdd } from '../../redux/features/postSection/addRatingSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Comment from './Comment';

const MovieDetails = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [thisCate, setThisCate] = useState([])
    const [comment, setComment] = useState(false)
    const [ratingsHover, setRatingsHover] = useState(0)
    const [thisRating, setthisRating] = useState(0)
    const [remainingCommennts, setRemainingCommennts] = useState([])
    const [commentId, setCommentId] = useState()

    const { id } = useParams()

    const { category } = useHomeCategories()



    const { isLoading, error, post: movie } = useSelector(state => state?.singlePost)

    const { comment: newComment } = useSelector(state => state?.commentAdding)
    const { comment: approvedComment } = useSelector(state => state?.commentApproving)
    const { comment: removedComment } = useSelector(state => state?.commentRemoving)
    const { comment: editedComment } = useSelector(state => state?.commentEditing)
    const { rating } = useSelector(state => state?.ratingAdding)

    // console.log(movie);

    const dispatch = useDispatch()

    const handleRating = (rating) => {

        setthisRating(() => rating)

        dispatch(ratingAdd({
            postId: movie?._id,
            rating: rating
        }))
        toast.success(`Your rating counted : ${rating}`)

    }

    useEffect(() => {
        window.scrollTo(0, 0)


        dispatch(singlePostGet(id))
        const singleCate = category?.find(cate => cate?._id == movie?.category)
        setThisCate(singleCate?.posts)

        // console.log(movie,'mov');
        // console.log(movie?.comments,'mov ccc');


    }, [])
// console.log(movie,'mov');

    const onSubmit = async (data) => {

        setComment(data?.comment)

        console.log(comment, data, 'cccccccc');

        const newComment = {
            postId: movie?._id,
            comment: data?.comment,
            userId: localStorage.getItem('userId')
        }
        dispatch(commentAdd(newComment))

        setTimeout(() => {
            // window.location.reload()
        }, 200);
    }

    const handleEditComment = (id) => {

        setCommentId(() => id)


    }

    const onSubmitEdit = (data) => {

        console.log(data);

        const editedComment = {
            postId: movie?._id,
            commentId: commentId,
            editedComment: data?.commentEdit,
            userId: localStorage.getItem('userId')
        }
        dispatch(commentEdit(editedComment))

        // const updatedComments = movie?.comments?.filter(item => item?._id != commentId);


        // const updatedComment = movie?.comments?.find(item => item?._id == commentId);



        // setRemainingCommennts(() => [...updatedComments, updatedComment])

        toast.success('Comment edited')

         setTimeout(() => {
            window.location.reload()
        }, 200);




    }

    const handleRemoveComment = (id) => {

        const data = {
            postId: movie?._id,
            commentId: id
        }
                console.log(data, 'rrr');
                console.log(id, 'id');
//

        // if (remainingCommennts.length == 1) {
        //     dispatch(commentRemove(data))
        //     // // setRemainingCommennts(() => [{ comment: null, _id: id }])
        //     return setTimeout(() => {
        //         window.location.reload()
        //     }, 200);
        // }

        // dispatch(commentRemove(data))

        setTimeout(() => {
            // window.location.reload()
        }, 200);

   
        toast.success('Comment deleted')

        




        // console.log(remainingCommennts, 'rrr');
        // console.log(movie?.comments?.length, 'lll');

    }


    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <div className='mx-auto bg-[#181818] text-slate-200 min-h-[100vh]'>
            <Toaster></Toaster>
            <div className=" h-[40vh]  w-[98vw] mx-auto relative mb-40 md:mb-60">
                <img className='md:h-[100vh] h-[40vh] w-[100vw] brightness-125 contrast-125' src={movie?.videoCover?.cdnUrl ? movie?.videoCover?.cdnUrl : 'https://i.ibb.co/R6Y4CQ3/1-white-1.png'} alt="" />
                <div className='absolute w-[98vw] md:pt-[13%] pt-[30%] md:pt-60 p-5 md:pl-28 md:top-[0%] top-[0%] md:h-[100vh] h-[40vh] text-white bg-gradient-to-t from-[#181818]'>
                    <h1 className='md:text-6xl text-2xl font-semibold'>{movie?.title}</h1>
                    <p  className='md:text-lg md:w-[40%] md:my-5 my-2'>{movie?.description?.slice(0,100)}...</p>

                    <div className='flex space-x-10'>
                        <Link to={'/payment'}><button className='md:py-3 px-16 py-1 font-semibold md:text-lg rounded max-w-xs text-white bg-[#e50914] hover:bg-[brown] cursor-pointer mt-4 mb-2'>Join Now</button></Link>
                    </div>


                    
                    <div className='md:flex items-center'>

                        <div className='mb-3 mt-5'>
                            <p className='text-[#e50914] text-2xl font-semibold'>Release Date  </p>

                            {/* <p className='text-2xl font-semibold'>{movie?.release}</p> */}
                        </div>

                        <div className='mt-3 md:ml-20'>
                            <p className='text-[#e50914] text-2xl font-semibold'>IMDb Rating</p>
                            <p className='text-2xl font-semibold'>{movie?.imdbRating}</p>
                        </div>
                    </div>

                </div>
            </div>


            <div className='md:mt-[32%] md:pl-16 pl-5 '>

                <p className='text-2xl font-semibold'>Videos || {movie?.title}  </p>
                {
                    <video className=' md:w-[50%] w-[90%] rounded my-5' controls poster={movie?.videoCover?.cdnUrl} controlsList="nodownload">
                        <source src={movie?.videos?.length && movie?.videos[0]?.url} />
                    </video>
                }

                <div onMouseLeave={() => setRatingsHover(0)} className='flex my-5'>
                    <h1 className='text-lg mr-4'>Give Your Rating :</h1>
                    <span title='rating-1'>
                        <svg onClick={(rating) => handleRating(1)} onMouseOver={() => setRatingsHover(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${ratingsHover >= 1 ? 'text-[red]' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    <span title='rating-2'>
                        <svg onClick={(rating) => handleRating(2)} onMouseOver={() => setRatingsHover(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${ratingsHover >= 2 ? 'text-[red]' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    <span title='rating-3'>
                        <svg onClick={(rating) => handleRating(3)} onMouseOver={() => setRatingsHover(3)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${ratingsHover >= 3 ? 'text-[red]' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    <span title='rating-4'>
                        <svg onClick={() => handleRating(4)} onMouseOver={() => setRatingsHover(4)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${ratingsHover >= 4 ? 'text-[red]' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    <span title='rating-5'>
                        <svg onClick={(rating) => handleRating(5)} onMouseOver={() => setRatingsHover(5)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${ratingsHover >= 5 ? 'text-[red]' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                </div>


                <div className='space-y-2'>
                    <h1 className='text-lg mr-4'>Average Given Ratings :</h1>
                    <div className='flex'>
                        {thisRating == 0 && movie?.ratings?.length
                            ?
                            movie?.ratings?.map(rating => rating?.rating).reduce(function (a, b) {
                                return a + b;
                            }, 0) / movie?.ratings?.map(rating => rating?.rating).length
                            :
                            (movie?.ratings?.map(rating => rating?.rating).reduce(function (a, b) {
                                return a + b;
                            }, 0) + thisRating) / (movie?.ratings?.map(rating => rating?.rating).length + 1)
                        }

                        <span title='' className='mx-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#e50914" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer text-[#e50914]`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </span>
                    </div>
                    <p className='text-[grey]'>Total :
                        {thisRating == 0
                            ?
                            movie?.ratings?.length
                            :
                            movie?.ratings?.length + 1} ratings</p>
                </div>


                <div className='w-[40%]'>
                    <div className='py-5 '>
                        <p className='text-[#e50914] text-2xl font-bold mb-3'>More Detail:  </p>

                        <div className=''>

                            <div className='mb-3 '>
                                <p className='text-[#e50914] text-2xl font-semibold my-2'>Tags  </p>

                                {
                                    movie?.tags?.map((tag,i)=><span className='bg-slate-600 p-1 border rounded m-1' key={i}>{tag}</span>)
                                }
                            </div>

                            <div className='my-3'>
                                <p className='text-[#e50914] text-2xl font-semibold'>Genres</p>
                                <p className=''>{movie?.genre}</p>
                            </div>
                        </div>
                        <p className='text-[#e50914] text-2xl font-semibold'>Description</p>

                        <p className='text-lg font md:w-[80%] w-60 text-justify'>{movie?.description}</p>
                    </div>

                    <div className=' md:w-96 w-40 '>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-10 space-y-2 pb-5 ">
                                <header className="font-semibold text-xl mb-5">Comment here</header>
                                <div className="comments-container  border-y  py-4">
                                    <div>
                                        <p className="font-medium flex items-center"> <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>

                                        <div className='grow-wrap'>
                                            <textarea
                                                required
                                                placeholder="Comment"
                                                id="text"
                                                minLength="2"
                                                // className="outline-0 pt-3 font-normal"
                                                className=" outline-0 p-3 font-normal  bg-slate-700 bg-opacity-50 md:my-5 rounded-lg  block md:w-full w-60"
                                                {...register("comment")}>
                                            </textarea>
                                            {/* {errors.comment && errors.comment.type === "required" && <span>This is required</span>}
                    {errors.comment && errors.comment.type === "minLength" && <span>minimum 2 characters</span>} */}
                                        </div>

                                        <input className="btn btn-xs bg-[brown] border-0 text-white " type="submit" value="response" />

                                    </div>
                                </div>
                            </div>
                        </form>


                        {
                            comment &&
                            <div className='my-3 md:m-2'>
                                <p className="font-medium flex items-center">
                                    <img className="w-8 h-8 rounded-full mr-2 border border-[brown]" src="https://i.ibb.co/vj0Ctmj/user.png" alt="" />{localStorage.getItem('email')} </p>

                                <div className='flex items-center'>
                                    <p className='md:m-3 bg-slate-800 p-2 rounded'> {comment}</p>
                                    <div className="dropdown dropdown-hover">
                                        <label tabIndex={0} className=" m-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow  rounded-box  bg-slate-600">
                                            <li ><a>Edit<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>

                                            </a></li>
                                            <li><a>Delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                            </a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            movie?.comments?.length > 0 && 

                            <div className='m-2 border-b'>
                                <div className='my-3'>{movie?.comments?.map(item =>{
                                    // console.log('cid',item?._id);
                                    return <Comment key={item?._id} item={item} postId={movie?._id}></Comment>
                                 
                                }
                                    
                                )}
                                </div>
                            </div>
                        }

                    </div>
                </div>



            </div>
            {
                thisCate?.length > 4 &&

                <div className='my-10'>
                    <h1 className='text-xl my-5 mx-5'>Recommended Movies</h1>
                    <Slider {...settings}>
                        {
                            thisCate?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                        }
                    </Slider>
                </div>
            }

            <Footer></Footer>
        </div >
    );
};

export default MovieDetails;
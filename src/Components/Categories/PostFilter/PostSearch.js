import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url, getAllPosts, getTotalPostsNumber } from "../../../api/api";
import usePosts from "../../Shared/usePosts";
import SingleMovieCard from "./SingleMovieCard";


const PostSearch = ({ searchText, filteredCategory }) => {

    const [filteredMovies, setfilteredMovies] = useState();
    const [movies, setMovies] = useState([])
    // const [searchText, setSearchText] = useState('')
    const [postsNumber, setpostsNumber] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])

    const filterHandler = (data) => {

        setfilteredMovies(() => data)

        // console.log('filtered', data);

    }


    // console.log('search',searchText);


    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await axios.get(`${base_url}/post?page=${page}&search=${searchText}&limit=${20}`)
            setPosts(data)

        }

        fetchPost()

        setMovies(posts)

        const fetchPostsNumber = async () => {
            const { data } = await getTotalPostsNumber()

            const totalPosts = data?.totalNumberOfPosts
            setpostsNumber(() => totalPosts)

        }


        fetchPostsNumber()

        setPageCount(() => Math.ceil(postsNumber / 20))

        if (searchText) {

            const searchResult = posts?.filter(movie => movie?.title?.toLowerCase()?.includes(searchText))

            setMovies(searchResult)
        }

    }, [posts, filteredMovies, searchText, postsNumber])

    // console.log(page,'page');


    return (
        <div className=" bg-[#181818]">
            <h1 className="pt-28 text-white text-center mb-10 text-xl md:text-3xl font-bold" >All Your Favourite Movies</h1>
            <div>

                {
                    posts?.length > 0 ?

                        <div className=' min-h-screen relative mx-auto  text-slate-200 w-[90%]  grid grid-cols-2 md:grid-cols-3 md:gap-4'>
                            {
                                posts?.map(movie => <SingleMovieCard movie={movie} key={movie?._id}></SingleMovieCard>)
                            }
                        </div>
                        :
                        <div>
                            <div className='text-slate-400 text-3xl mx-auto w-96 text-center h-[100vh]'>
                                <h1 className='text-white font-semibold my-10 text-4xl'>{filteredCategory?.categoryName} </h1>

                                No Movies Available ! <br />
                                Please Try another Search
                            </div>

                        </div>

                }

                <div className="flex justify-center py-10 mx-auto ">
                    {pageCount < 11 ?
                        <div> <button onClick={() => setPage(page - 1)} className="btn btn-sm mx-2">prev</button>
                            {[...Array(pageCount).keys()].map(number =>
                                <button onClick={() => setPage(number + 1)} className={`btn btn-sm mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}>{number + 1}</button>
                            )}
                            <button onClick={() => setPage(page + 1)} className="btn btn-sm mx-2">next</button>
                        </div>
                        :

                        <div>
                            <button onClick={() => setPage(page - 1)} className="btn btn-sm mx-2">prev</button>
                            {[...Array(5).keys()].map(number =>
                                <button onClick={() => setPage(number + 1)} className={`btn btn-sm mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}>{number + 1}</button>
                            )}
                            {[...Array(pageCount).slice(6, pageCount - 6).keys()].map(number =>
                                <button onClick={() => setPage(number + 1)} className={`btn btn-sm hidden mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}></button>
                            )}
                            {
                                page > 6 && page < pageCount - 5 ?
                                    <span> <button className="btn btn-sm mx-2 text-center border bg-[brown]">.</button>
                                        <button className="btn btn-sm mx-2 text-center border bg-[brown]">.</button>
                                        <button className="btn btn-sm mx-2 text-center border bg-[brown]">.</button>
                                    </span>
                                    :
                                    <span> <button className="btn btn-sm mx-2 text-center border">.</button>
                                        <button className="btn btn-sm mx-2 text-center border">.</button>
                                        <button className="btn btn-sm mx-2 text-center border">.</button>
                                    </span>
                            }
                            {[...Array(pageCount).keys()].map(number =>
                                <button onClick={() => setPage(number + 1)} className={`btn btn-sm mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}>{number + 1}</button>
                            ).slice(pageCount - 5, pageCount)}
                            <button onClick={() => setPage(page + 1)} className="btn btn-sm mx-2">next</button>
                        </div>
                    }

                </div>
            </div>


        </div>


    );
};

export default PostSearch;


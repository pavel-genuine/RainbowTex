import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { base_url, getAllPosts, getTotalPostsNumber } from "../../../api/api";
import usePosts from "../../Shared/usePosts";
import SingleMovieCard from "./SingleMovieCard";


const PostSearch = ({ searchText ,filteredCategory}) => {

    const [filteredMovies, setfilteredMovies] = useState();
    const [movies, setMovies] = useState([])
    // const [searchText, setSearchText] = useState('')
    const [postsNumber, setpostsNumber] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)
    // const [posts, setPosts] = useState([])

    const filterHandler = (data) => {

        setfilteredMovies(() => data)

        // console.log('filtered', data);

    }
    let { isLoading, error, posts } = usePosts(`?search=${searchText}`)
    
    // console.log('search',searchText);

   
    useEffect(() => {
        const fetchPost = async () => {
            // const { data } = await axios.get(`${base_url}/post?search=${searchText}&category=${filteredCategory}`)
            // const { data } = getAllPosts('2')
            // setPosts(data)
           
            // console.log('data',data);
            console.log( 'text',searchText);
            console.log( 'filter',filteredCategory);

        }
      
        fetchPost()

        setMovies(posts)

        console.log('posts ',posts);
        console.log('movies ',movies);

        const fetchPostsNumber = async () => {
            const { data } = await getTotalPostsNumber()

            const totalPosts = data?.totalNumberOfPosts
            setpostsNumber(() => totalPosts)
            // console.log('res', data?.totalNumberOfPosts);
            // console.log('post', postsNumber);
        }


        fetchPostsNumber()

        setPageCount(() => Math.ceil(postsNumber / 20))

        window.scrollTo(0, 0)

       

        if (searchText) {

            const searchResult = posts?.filter(movie => movie?.title?.toLowerCase()?.includes(searchText))

            setMovies(searchResult)

            // console.log(searchResult, 'ressss');
        }

    }, [posts, filteredMovies, searchText,postsNumber])


    return (
        <div className=" bg-[#181818]">
            <h1 className="pt-28 text-white text-center mb-10 text-xl md:text-3xl font-bold" >All Your Favourite Movies</h1>
            <div className=' min-h-screen relative mx-auto  text-slate-200 w-[90%]  grid grid-cols-2 md:grid-cols-3 gap-4'>
                
                {
                    posts?.map(movie => <SingleMovieCard movie={movie} key={movie?._id}></SingleMovieCard>)
                }

            </div>
            <div className="flex justify-center py-10 mx-auto ">
                {
                    [...Array(pageCount).keys()].map(number => <button onClick={() => setPage(number + 1)} className={`btn btn-sm mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}>{number + 1}</button>)
                }
            </div>
        </div>
    );
};

export default PostSearch;


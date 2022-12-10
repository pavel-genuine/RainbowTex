import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { base_url, getAllPosts, getTotalPostsNumber } from "../../../api/api";
import { addFeatured } from "../../../redux/features/featuredPost/featuredPostSlice";
import { postDelete } from "../../../redux/features/postSection/postSlice";
import SideBar from "../SideBar";
import FeaturedBanner from "./FeaturedBanner";
import Filter from "./Filter";

const MovieList = () => {

    const [filteredMovies, setfilteredMovies] = useState();
    const [active, setActive] = useState(true);
    const showActive = useRef(true)

    const [movies, setMovies] = useState([])
    const [searchText, setSearchText] = useState('')
    const [postsNumber, setPostsNumber] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState(1)

    const filterHandler = (data) => {

        setfilteredMovies(() => data)

        // console.log('filtered', data);
    }

    const { post } = useSelector(state => state?.deletePost)
    const dispatch = useDispatch()


    const addBanner = (data) => {
        dispatch(addFeatured(data))
    }

    const searchHandler = (data) => {
        setSearchText(() => data)

    }

    // console.log('page',page);


    const handleDeleteOne = (id) => {
        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            dispatch(postDelete(id))
            const newMovies = movies?.filter(item => item?._id != id);
            setMovies(() => newMovies)

        }
    }


    useEffect(() => {


        const fetchPost = async () => {
            const { data } = await axios.get(`${base_url}/post?page=${page}&search=${searchText}&limit=${20}`)
            setPosts(data)

            // console.log('data',data);

            // console.log( 'text',searchText)

        }

        fetchPost()

        const fetchPostsNumber = async () => {
            const { data } = await getTotalPostsNumber()

            const totalPosts = data?.totalNumberOfPosts
            setPostsNumber(() => totalPosts)
            // console.log('res',data?.totalNumberOfPosts);
            // console.log('post',postsNumber);
        }


        fetchPostsNumber()

        setPageCount(() => Math.ceil(postsNumber / 20))

        setMovies(() => posts)

        // console.log('posts',posts);
        // console.log('movies',movies);


        if (filteredMovies == 1) {
            setMovies(posts)
        }
        else if (filteredMovies?._id) {
            setMovies(() => filteredMovies?.posts)
        }


    }, [posts, filteredMovies, searchText, page])

    const onChangeActive = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            showActive.current = true
            setActive(() => true)
        }
        else {
            showActive.current = false
            setActive(() => false)
        }
    }


    return (
        <div className='py-16 min-h-screen relative bg-[#181818] text-slate-200'>

            <div className='mx-auto w-[100%] pt-[.7%] md:grid grid-cols-12  '>
                <SideBar index={2} color={'[#e50914]'}></SideBar>
                <div className="col-span-10 w-[100%]  mt-10 mx-auto md:w-[95%]">

                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div className=''>
                            <div className="px-5 md:px-0">
                                <p className='font-semibold my-2 text-xl underline underline-offset-2 '> Movies List</p>
                                <Filter filterHandler={filterHandler} searchHandler={searchHandler}></Filter>

                                <p className='font-semibold my-5 bg-slate-600 px-3 py-2 md:mr-20 text-lg md:w-96 '>Total Movies Uploaded : {movies?.length} </p>

                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table class="shadow-lg table-auto overflow-x-scroll overflow-auto w-full mt-5 ">
                                    <thead className='text-white'>
                                        <tr className='bg-[brown]'>
                                            <th class=" border border-[#181818] text-left pl-4 py-4">Movie Title</th>
                                            <th class=" border border-[#181818] text-left pl-4 py-4">Tumbnail</th>
                                            <th class=" border border-[#181818] text-left pl-4 py-4">Category</th>
                                            {/* <th class=" border border-[#181818] text-left px-8 py-4">Is Live</th> */}
                                            <th class=" border border-[#181818] text-left pl-2 py-4">Add To Banner</th>
                                            <th class=" border border-[#181818] text-left pl-2 py-4">IMDb Rating</th>
                                            <th class=" border border-[#181818] text-left pl-2 py-4">Create Time</th>
                                            <th class=" border border-[#181818] text-left pl-2 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-[#26282b]'>
                                        {movies?.length > 0 &&

                                            movies?.map(movie => {
                                                return <tr key={movie?._id}>
                                                    <td class="border border-[#181818] pl-4 py-2">{movie?.title}</td>
                                                    <td class="border border-[#181818] pl-10 ">
                                                        <img className="w-28" src={movie?.thumbnail?.cdnUrl} alt="" />
                                                    </td>
                                                    <td class="border border-[#181818]  pl-4 py-2">{movie?.categoryName}</td>
                                                    {/* <td class="border border-[#181818]  px-5 py-2">

                                                    <div className='md:flex md:space-x-5 md:mt-[4%] '>
                                        {
                                            active ?
                                                <div>
                                                    {movie?.isActive &&
                                                        <div className="form-control mt-10 ">
                                                            <label className="label cursor-pointer">
                                                                <input onChange={onChangeActive} type="checkbox"
                                                                    checked
                                                                    className="checkbox bg-slate-200 checkbox-error "
                                                                />
                                                            </label>
                                                        </div>
                                                    }
                                                </div>
                                                :

                                                <div>
                                                    {
                                                        <div className="form-control mt-10 ">
                                                            {showActive.current ?
                                                                <label className="label cursor-pointer">
                                                                    <input onChange={onChangeActive} type="checkbox"
                                                                        checked
                                                                        className="checkbox bg-slate-200 checkbox-error "
                                                                    />
                                                                </label>
                                                                :
                                                                <label className="label cursor-pointer">
                                                                    <input onChange={onChangeActive} type="checkbox"
                                                                        className="checkbox bg-slate-200 checkbox-error "
                                                                    />
                                                                </label>
                                                            }
                                                        </div>
                                                    }
                                                </div>

                                        }
                                    </div>


                                                    </td> */}
                                                    <td class="border border-[#181818]  pl-10 py-2">
                                                        <FeaturedBanner key={movie?._id} movie={movie}></FeaturedBanner>
                                                    </td>

                                                    <td class="border border-[#181818]  pl-10 py-2">{movie?.imdbRating}</td>
                                                    <td class="border border-[#181818]  pl-2 py-2">{movie?.createdAt}</td>
                                                    <td class="border border-[#181818] pl-2 py-2 ">
                                                        <p className='flex'>
                                                            <span title='edit' >
                                                                <Link to={`/dashboard/edit-post/${movie?._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-5 cursor-pointer text-[blue]">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                                </Link>
                                                            </span>

                                                            <span onClick={() => handleDeleteOne(movie?._id)} title='remove'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </span>
                                                        </p>

                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

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

        </div>
    );
};

export default MovieList;
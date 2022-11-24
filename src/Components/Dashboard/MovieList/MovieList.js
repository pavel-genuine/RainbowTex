import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeatured } from "../../../redux/features/featuredPost/featuredPostSlice";
import { postDelete } from "../../../redux/features/postSection/postSlice";
import usePosts from "../../Shared/usePosts";
import SideBar from "../SideBar";
import FeaturedBanner from "./FeaturedBanner";
import Filter from "./Filter";


const MovieList = () => {

    const [isBanner, setIsBanner] = useState(false)

    let {isLoading, error, posts} = usePosts()

    const { post } = useSelector(state => state?.deletePost)
    const { featured } = useSelector(state => state?.addFeatured)

    const dispatch = useDispatch()
    const [movies, setMovies] = useState([])

    const addBanner = (data) => {
        dispatch(addFeatured(data))
    }


    useEffect(() => {

        window.scrollTo(0, 0)
        setMovies(posts)

    }, [posts])

    const handleDeleteOne = (id) => {
        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            posts = posts?.filter(item => item?._id != id);
            dispatch(postDelete(id))
            setMovies(posts)
        }
    }
    


    return (
        <div className='py-16 min-h-screen relative bg-[#181818] text-slate-200'>

            <div className='mx-auto w-[100%] pt-[.7%] md:grid grid-cols-12  '>
                <SideBar index={2} color={'[#e50914]'}></SideBar>
                <div className=" lg:ml-20 col-span-10 w-[100%] px-[5%] mt-10  md:w-[100%]">

                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div className=''>
                            <p className='font-semibold my-2 text-xl underline underline-offset-2 '> Movies List</p>
                            <Filter></Filter>

                            <p className='font-semibold my-5 bg-slate-600 px-3 py-2 md:mr-20 text-lg md:w-96 '>Total Movies Uploaded : {movies?.length} </p>
                            <div style={{ overflowX: 'auto' }}>
                                <table class="shadow-lg table-auto overflow-x-scroll overflow-auto w-full mt-5">
                                    <thead className='text-white'>
                                        <tr className='bg-[brown]'>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Movie Title</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Tumbnail</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Category</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Is Live</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Add To Banner</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">IMDb Rating</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Release Date</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-[#26282b]'>
                                        {
                                            movies?.map(movie => <tr>
                                                <td class="border border-[#181818] px-8 py-4">{movie?.title}</td>
                                                <td class="border border-[#181818] ">
                                                    <img className="w-36" src={movie?.thumbnail?.cdnUrl} alt="" />
                                                </td>
                                                <td class="border border-[#181818] px-8 py-4">Sci-fi</td>
                                                <td class="border border-[#181818] px-8 py-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                </td>
                                                <td class="border border-[#181818] px-8 py-4">
                                                   <FeaturedBanner key={movie?._id} movie={movie}></FeaturedBanner>
                                                </td>

                                                <td class="border border-[#181818] px-8 py-4">{movie?.imdbRating}</td>
                                                <td class="border border-[#181818] px-8 py-4">{movie?.createdAt}</td>
                                                <td class="border border-[#181818] px-8 py-4 ">
                                                    <p className='flex'>
                                                        <span title='edit'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </span>
                                                        <span onClick={() => handleDeleteOne(movie?._id)} title='remove'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </span>
                                                    </p>

                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieList;


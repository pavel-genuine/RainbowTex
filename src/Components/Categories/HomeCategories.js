import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { homeCategory } from '../../api/api'

import useHomeCategories from '../Shared/hooks/useHomeCategories'
import usePosts from '../Shared/usePosts'
import HomePosts from './HomePosts'
import SinglePost from './SinglePost'
import { settings } from './slickSetting'

const HomeCategories = ({ filteredCategory, searchText }) => {

    const [movies, setMovies] = useState([])
    const { category } = useHomeCategories()
    // let { isLoading, error, posts } = usePosts()

    // useEffect(() => {

    //     // console.log(category, 'posts');

    //     if (searchText) {

    //         const searchResult =posts?.filter(movie=>movie?.title?.toLowerCase()?.includes(searchText))

    //         setMovies(searchResult)

    //         console.log(searchResult, 'ressss');
    //         console.log(movies, 'ressss mmmm');
    //     }

    // }, [category,searchText])


    return (
        <div>
            {filteredCategory?._id ?
                <div>
                    {
                        filteredCategory?.posts?.length ? <div>
                            <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{filteredCategory?.categoryName} </h1>

                            <Slider {...settings}>
                                {
                                    filteredCategory?.posts?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                                }
                            </Slider>
                        </div> :
                            <div>
                                {
                                    <div>
                                        <div className='text-slate-400 text-3xl mx-auto w-96 text-center'>
                                            <h1 className='text-white font-semibold my-10 text-4xl'>{filteredCategory?.categoryName} </h1>

                                            No Movies Available ! <br />
                                            Please Try another Category
                                        </div>
                                    </div>
                                }
                            </div>
                    }
                </div>
                :
                !filteredCategory?._id &&
                category?.length > 0 &&
                category?.map(cate => {
                    return cate?.posts.length < 5 && cate?.posts.length > 0 ?
                        <div>
                            <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{cate?.categoryName} </h1>

                            <div className='grid md:grid-cols-5 grid-cols-2'>
                                {
                                    cate?.posts?.map((movie) => <div className='col-span-1'><SinglePost key={movie?._id} movie={movie}></SinglePost></div>)
                                }
                            </div>
                        </div>
                        :
                        cate?.posts.length > 0 &&
                        <div>
                            <h1 className='text-white font-semibold text-lg md:text-xl mt-5 mx-2 md:mt-10 mb-4'>{cate?.categoryName} </h1>

                            <Slider {...settings}>
                                {
                                    cate?.posts?.map((movie) => <SinglePost key={movie?._id} movie={movie}></SinglePost>)
                                }
                            </Slider>
                        </div>

                })
            }

        </div>
    )
}

export default HomeCategories
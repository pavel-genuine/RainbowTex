import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryCreate } from '../../../redux/features/categorySlice'
import CustomLink from '../../Navbar/CustomLink'
import useAllCategories from '../../Shared/useAllCategories'
import AddCategory from './AddCategory'

const Filter = () => {

    const { error, category, isLoading } = useAllCategories()

    const { category: newCategory } = useSelector(state => state?.categoryCreate)

    const dispatch = useDispatch()

    console.log(category?.categories, 'all cate');

    const handleAddCategory = (data) => {

        dispatch(categoryCreate(data))
    }

    return (
        <div className='md:flex items-center my-10'>
            <div class="dropdown dropdown-hover ">
                <label tabindex="0" class="">
                    <CustomLink class="btn-ghost rounded bg-slate-800 hover:bg-slate-600 p-2">Filter By Categories</CustomLink>
                </label>
                <div tabindex="0" class="space-y-2 px-4 py-6 rounded-lg dropdown-content menu  ml-12 mt-2 shadow text-white bg-black bg-opacity-60 w-auto">
                    <div className='flex space-x-10'>
                        <div className='space-y-2'>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>

                        </div>
                        <div className='space-y-2'>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-control w-full max-w-xs md:block md:mr-40 mb-2">
                <input
                    type="text"
                    placeholder="Search movies"
                    className={`outline-0 px-4 py-2 mt-10 md:mt-0 md:ml-20 w-full max-w-xs rounded-full bg-opacity-80 text-white bg-[grey] `}
                // {...register("search")}
                />
            </div>

            <AddCategory></AddCategory>

        </div>
    )
}

export default Filter
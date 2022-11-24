import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../api/api'
import { categoryCreate } from '../../../redux/features/categorySlice'
import CustomLink from '../../Navbar/CustomLink'
import useAllCategories from '../../Shared/useAllCategories'
import AddCategory from './AddCategory'

const Filter = () => {

    const [newCate, setNewCate] =useState({})

    const { error, category, isLoading } = useAllCategories()

    const handleNewCate=(data)=>{
        setNewCate(data)
    }


    return (
        <div className='md:flex items-center my-10'>
            <div class="dropdown dropdown-hover ">
                <label tabindex="0" class="">
                    <CustomLink class="btn-ghost rounded bg-slate-800 hover:bg-slate-600 p-2">Filter By Categories</CustomLink>
                </label>
                <div tabindex="0" class="space-y-2 px-4 py-6 rounded-lg dropdown-content menu  ml-12 mt-2 shadow text-white bg-black bg-opacity-60 w-auto">
                <div>

                </div>
                    <ul className='md:grid grid-cols-2 md:w-[20vw]'>
                       {
                        category?.categories?.length > 0 &&
                        category?.categories.map(item=>{ 
                            return<li><CustomLink class="border-b-2 cursor-pointer ">{item?.categoryName}</CustomLink></li>
                        })
                       }
                       <li><CustomLink class="border-b-2 cursor-pointer ">{newCate?.categoryName}</CustomLink></li>
                
                    </ul>
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

            <AddCategory handleNewCate={handleNewCate}></AddCategory>

        </div>
    )
}

export default Filter
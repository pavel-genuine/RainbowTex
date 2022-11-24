import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getAllCategories } from '../../../api/api'
import { categoryCreate, categoryDelete } from '../../../redux/features/categorySlice'
import CustomLink from '../../Navbar/CustomLink'
import useAllCategories from '../../Shared/useAllCategories'
import AddCategory from './AddCategory'

const Filter = () => {

    const [newCate, setNewCate] = useState({})
    const [addedCate, setAddedCate] = useState({})
    const [delCate, setDelCate] = useState({})

    const { error, category, isLoading } = useAllCategories()

    const { category: deletedCategory } = useSelector(state => state?.categoryDeleting)


    const dispatch = useDispatch()

    const handleDeleteCategory = async (data) => {
        console.log('del cate id', data);
        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            // dispatch(categoryDelete({_id:data}))

            const res = await deleteCategory({ _id: data })
            console.log(res?.data, 'del data');
        }
    }
    // await deleteCategory({_id:data})

    const handleNewCate = (data) => {
        setAddedCate(() => data)
        setNewCate(() => ([...category?.categories, data]))
    }

    return (
        <div className='md:flex items-center my-5'>

            <div className="form-control  md:mb-3 ">
                <label className="label">
                    {/* <span className="label-text text-gray-600  ">Pick the category</span> */}
                    {/* <span className="label-text-alt">Alt label</span> */}
                </label>
                <select className="select select-sm select-bordered bg-slate-400">


                    <option disabled selected>Filter ByCategory</option>
                    {
                        category?.categories?.length > 0 &&
                        category?.categories?.map(item => {
                            return <option value={item?._id} className='bg-[brown] hover:bg-[brown]'>{item?.categoryName}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-control w-full max-w-xs md:block">
                <input
                    type="text"
                    placeholder="Search movies"
                    className={`outline-0 px-4 py-2 mt-10 md:mt-0 md:ml-20 w-full max-w-xs rounded-full bg-opacity-80 text-white bg-[grey] `}
                // {...register("search")}
                />
            </div>

            <div className='md:mr-16 md:ml-32 my-5 md:my-0'>
                <AddCategory handleNewCate={handleNewCate}></AddCategory>
            </div>

            <div className="form-control  md:mb-3 ">
                <label className="label">
                    {/* <span className="label-text text-gray-600  ">Pick the category</span> */}
                    {/* <span className="label-text-alt">Alt label</span> */}
                </label>
                <select onChange={(e) => { handleDeleteCategory(e.target.value) }} className="select select-sm select-bordered bg-slate-400">


                    <option disabled selected>Delete Category</option>
                    {
                        category?.categories?.length > 0 &&
                        category?.categories?.map(item => {
                            return <option value={item?._id} className='bg-[brown] hover:bg-[brown]'>{item?.categoryName}</option>
                        })
                    }
                </select>
            </div>

        </div>
    )
}

export default Filter
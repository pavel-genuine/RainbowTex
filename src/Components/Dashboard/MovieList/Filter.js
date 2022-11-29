import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {categoryDelete} from "../../../redux/features/categorySlice";
import AddCategory from "./AddCategory";
import useHomeCategories from "../../Shared/hooks/useHomeCategories";
import { useForm } from "react-hook-form";

const Filter = ({ filterHandler,searchHandler }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [addedCate, setAddedCate] = useState('');
    const [myCategories, setMycategories] = useState([])

    const { category: homeCates } = useHomeCategories()

    const onSubmit = (data) => {

        const searchText =data?.search?.toLowerCase()
        console.log('text',searchText);
        searchHandler(searchText)

    }

    const handleFilterCate = (id) => {
        if (id == 1) {
            filterHandler(1)
        }
        const singleCate = homeCates?.find(cate => cate?._id == id)
        filterHandler(singleCate)
    }

    useEffect(() => {

        setMycategories(homeCates)

    }, [homeCates])

    const { category: deletedCategory } = useSelector((state) => state?.categoryDeleting);

    const dispatch = useDispatch();

    const handleDeleteCategory = async (_id) => {
        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            const myCates = myCategories?.filter(item => item?._id !== _id);
            dispatch(categoryDelete({ data: { _id } }))
            setMycategories(myCates)
        }

    };
    const handleNewCate = (data) => {
        setAddedCate(() => data);
        // console.log(addedCate,'add');
    };


    return (
        <div className="md:flex items-center my-5">

            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-sm m-1">Filter By Category</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 rounded w-[30vw] bg-slate-800 grid grid-cols-2 gap-4 bg-opacity-90 md:ml-20 p-3">
                    {<li onClick={() => handleFilterCate(1)} className="bg-[brown] cursor-pointer bg-opacity-90 my-2 px-2 py-1 rounded ">
                        {'All Movies'}

                    </li>}
                    {myCategories?.map(item => <li onClick={() => handleFilterCate(item?._id)} className="bg-[brown] cursor-pointer bg-opacity-90 my-2 px-2 py-1 rounded ">
                        {item?.categoryName}

                    </li>)}
                    {addedCate && <li className="bg-[brown] cursor-pointer bg-opacity-90 my-2 px-2 py-1 rounded ">
                        {addedCate}

                    </li>}
                </ul>
            </div>


            <div className="form-control w-full max-w-xs md:block">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search movies"
                            className={`outline-0 px-4 py-2 mt-10 md:mt-0 md:ml-20 w-full max-w-xs rounded-full bg-opacity-80 text-white bg-[grey] `}
                            {...register("search")}
                        />
                        <input className='hidden bg-opacity-80 text-slate-400 bg-[grey] py-2 px-2 cursor-pointer border-l rounded-r-full pr-4' type="submit" value="Search" />

                    </div>
                </form>
            </div>


            <div className="md:mr-10 md:ml-28 my-5 md:my-0">
                <AddCategory handleNewCate={handleNewCate}></AddCategory>
            </div>


            <label htmlFor="my-modal-x" className="btn btn-sm">Delete Category</label>

            <input type="checkbox" id="my-modal-x" className="modal-toggle" />
            <label htmlFor="my-modal-x" className="modal cursor-pointer">
                <label className="modal-box relative bg-slate-800 py-10 px-4 w-11/12 max-w-2xl" htmlFor="">
                    <h1 className="text-xl font-semibold text-center mb-5">Delete Category</h1>
                    <div className=" grid grid-cols-2 gap-4">
                        {
                            myCategories?.map(item => <li className="cursor-pointer border my-2 px-4 py-2 rounded flex justify-between">
                                {item?.categoryName}
                                <span title='remove' onClick={() => handleDeleteCategory(item?._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                            </li>
                            )
                        }
                        {
                            addedCate &&
                            <li className="cursor-pointer border my-2 px-4 py-2 rounded flex justify-between">
                                {addedCate}
                                <span onClick={() => setAddedCate()} title='remove'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                            </li>
                        }
                    </div>
                </label>
            </label>

        </div>
    );
};

export default Filter; 
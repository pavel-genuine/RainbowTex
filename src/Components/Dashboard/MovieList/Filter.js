import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryDelete } from "../../../redux/features/categorySlice";
import AddCategory from "./AddCategory";
import useHomeCategories from "../../Shared/hooks/useHomeCategories";
import { useForm } from "react-hook-form";

const Filter = ({ filterHandler, searchHandler }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [addedCate, setAddedCate] = useState('');
    const [myCategories, setMycategories] = useState([])

    const { category: homeCates } = useHomeCategories()

    const onSubmit = (data) => {

        const searchText = data?.search?.toLowerCase()
        console.log('text', searchText);
        searchHandler(searchText)

    }

    const handleFilterCate = (id) => {

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
        <div className="lg:flex items-center my-5 space-y-4 lg:space-y-0">

            <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-sm m-1">Filter By Category</label>
                <ul tabIndex={0} className="dropdown-content menu  rounded w-[70vw] md:w-[50vw] lg:w-[30vw]  bg-black grid grid-cols-2 gap-3 bg-opacity-90 md:ml-20 px-1 md:px-4 py-4">
                    {<li onClick={() => window.location.reload()} className="bg-[brown] cursor-pointer bg-opacity-90 px-1  rounded ">
                        {'All Movies'}

                    </li>}
                    {myCategories?.map(item => <li onClick={() => handleFilterCate(item?._id)} className="bg-[brown] cursor-pointer bg-opacity-90  px-1  rounded ">
                        {item?.categoryName}

                    </li>)}
                    {addedCate && <li className="bg-[brown] cursor-pointer bg-opacity-90 my-2 px-2 py-1 rounded ">
                        {addedCate}

                    </li>}
                </ul>
            </div>


            <div className="form-control lg:w-[30%] md:w-[40%] w-[70%] md:block">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search movies"
                            className={`outline-0 px-4 py-2 md:mt-0 lg:ml-10 w-full rounded-full bg-opacity-80 text-white bg-[grey] `}
                            {...register("search")}
                        />
                        <button className=' bg-opacity-80 text-slate-400 bg-[grey] py-2 px-2 cursor-pointer  rounded-r-full pr-4 hidden' type="submit"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        </button>
                    </div>
                </form>
            </div>


            <div className="lg:mr-10 lg:ml-10 my-5 md:my-0">
                <AddCategory handleNewCate={handleNewCate}></AddCategory>
            </div>


            <label htmlFor="my-modal-x" className="btn btn-sm">Delete Category</label>
            <input type="checkbox" id="my-modal-x" className="modal-toggle" />
            <label htmlFor="my-modal-x" className="modal cursor-pointer">
                <label className="modal-box relative bg-slate-800 py-10 px-4 w-11/12 max-w-2xl" htmlFor="">
                    <label htmlFor="my-modal-x" className="modal-action btn btn-sm btn-circle absolute right-2 top-[-2.5%] p-2">✕</label>

                    <h1 className="text-xl font-semibold text-center mb-5">Delete Category</h1>
                    <div className=" grid grid-cols-2 gap-3">
                        {
                            myCategories?.map(item => <li className="cursor-pointer border px-2 py-1 rounded flex justify-between">
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
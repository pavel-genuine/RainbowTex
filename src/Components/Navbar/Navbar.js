// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import './Navbar.css'
import CustomLink from './CustomLink';
import useAllCategories from '../Shared/useAllCategories';
import { logOut } from '../../api/api';
import useHomeCategories from '../Shared/hooks/useHomeCategories';
import { useForm } from 'react-hook-form';

const Navbar = ({ filterHandler, searchHandler }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [background, setBackground] = useState(false)
    const [modifiedNav, setModifiedNav] = useState(false)

    const { category: homeCates } = useHomeCategories()
    const token = localStorage.getItem('loginToken')
    const logoutHandler = async () => {

        await logOut()
        localStorage?.removeItem('loginToken')
        localStorage?.removeItem('email')
        localStorage?.removeItem('userId')
        window.location.reload();
    }

    const handleFilterCate = (id) => {


        const singleCate = homeCates?.find(cate => cate?._id == id)

        filterHandler(singleCate)
    }

    const { error, category, isLoading } = useAllCategories()

    const navigate = useNavigate()

    const onSubmit = (data) => {

        const searchText = data?.search?.toLowerCase()
        console.log('text nav', searchText);
        console.log('text nav type', typeof(searchText));
        searchHandler(searchText)
        // navigate('/post-search')
        return
    }

    const changeBackground = () => {

        if (window.scrollY >= 80) {
            setBackground(true)

        } else {
            setBackground(false)

        }
    }





    window.addEventListener('scroll', changeBackground)

    const personalizeItems =
        <>
            {token &&
                <div className="dropdown dropdown-end ">

                    <input type="checkbox" name="toggle" id="toggler" />

                    <label tabIndex="0" htmlFor="toggler" name="toggle" className="btn btn-ghost btn-circle avatar">
                        <div className="w-9 border border-[brown] rounded-full" >
                            {
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8Wygf4kyxHztYd0ep1BAq_ARXG9lxZsIosP60cyBiOSNLPRprFE126kSfSPhqNGcvNU&usqp=CAU" />
                            }
                        </div>
                    </label>
                    <ul tabIndex="0" id='profile' className="bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[450%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl  bg-opacity-60 rounded-box w-52">

                        <div className='space-y-2'>
                            <Link to="/profile">
                                <li>
                                    <img className='w-14 border border-[brown]  rounded-full'
                                        src={"https://i.ibb.co/vj0Ctmj/user.png"} />
                                </li>
                            </Link>
                            {/* <Link to="/profile">
                                <li className='font-semibold text-[white]  text-lg hover:text-[brown]  word-break'>{user.displayName}</li>
                            </Link> */}
                            {/* <li className='text-[white] text-sm  break-all'>{user.email}</li> */}
                            <li>

                                <Link to='/profile' className="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                    View Profile
                                </Link>
                            </li>
                            <li >
                                {
                                    localStorage.getItem('isAdmin') &&
                                    <Link onClick={() => setModifiedNav(true)} to='/dashboard' className="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>

                                }
                            </li>
                        </div>



                        <div className='space-y-2 pt-4'>

                            <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li>
                            <li><button onClick={logoutHandler} className='btn btn-xs'>Logout</button></li>

                        </div>


                    </ul>
                </div>

            }</>


    const menuItems =
        <>
            <div className=" flex w-[99%] mt-2 md:w-[76%] text-white relative md:hidden ">

                <label tabIndex="0" htmlFor='bigTogglerpro' className="">
                    <div className="indicator cursor-pointer rounded-full felx justify-center items-center">
                        {modifiedNav &&
                            <p className="btn-ghost hover:rounded font-bold md:p-3 md:m-5 mr-1" >Categories</p>

                        }
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </label>
                <input type="checkbox" name="" id="bigTogglerpro" />


                <ul className="space-y-2 p-4 font-bold rounded-lg notificationpro text-black absolute left-[80%] top-[100%] bg-black text-[white]  bg-opacity-60 ">
                    <ul className='md:grid grid-cols-2 md:w-[20vw]'>
                        {<CustomLink to={`/post-search`} className="border-b-2 ml-4 mt-4 cursor-pointer ">
                            All Movies</CustomLink>}
                        {
                            category?.categories?.length > 0 &&
                            category?.categories.map(item => {
                                return <li key={item?._id} onClick={(id) => handleFilterCate(item?._id)}><CustomLink className="border-b-2 cursor-pointer ">{item?.categoryName}</CustomLink></li>
                            })
                        }
                    </ul>
                </ul>
            </div>

            <div className="dropdown dropdown-hover hidden md:block relative">
                {!modifiedNav &&
                    <label tabIndex="0" className="">
                        <CustomLink className="btn-ghost hover:rounded md:p-3 md:m-5" >Categories</CustomLink>
                    </label>
                }
                <div tabIndex="0" className="px-4 py-6 abolute right-[30%] rounded-lg dropdown-content menu mt-3 shadow text-white bg-black bg-opacity-60 w-auto">

                    {<CustomLink to={`/post-search`} className="border-b-2 ml-4 mt-4 cursor-pointer ">
                        All Movies</CustomLink>}
                    <ul className='md:grid grid-cols-2 md:w-[20vw] mt-4'>

                        {
                            category?.categories?.length > 0 &&
                            category?.categories.map(item => {
                                return <li key={item?._id} onClick={(id) => handleFilterCate(item?._id)}><CustomLink className="border-b-2 cursor-pointer ">{item?.categoryName}</CustomLink></li>
                            })
                        }

                    </ul>

                </div>
            </div>
            {!token &&
                <CustomLink onClick={() => setModifiedNav(true)} className="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-up'>Sign Up</CustomLink>

            }
            {!token &&
                <CustomLink onClick={() => setModifiedNav(true)} className="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-in'>Sign In</CustomLink>
            }
        </>


    return (
        <div >

            <div className={`nav h-[70px]  fixed text-white bg-[#181818] ${background ? 'bg-opacity-80' : 'bg-opacity-20 bg-gradient-to-b from-black '} backdrop-filter-none backdrop-blur-sm shadow z-100`}>
                <div className="lg:navbar lg:w-[100vw]  mx-auto flex md:justify-around justify-between items-center">
                    <div className="lg:navbar-start hidden md:block">
                        <Link onClick={() => setModifiedNav(false)} to='/' className=" normal-case text-xl ">
                            <img className='md:w-40 ml-20 mt-2' src="https://i.ibb.co/Mnc17bk/1-22-removebg-preview.png" alt="" />
                        </Link>
                    </div>




                    <div className='lg:hidden flex justify-between items-center p-2'>
                        <div className="dropdown">
                            <label htmlFor='menuToggler' tabIndex="0" className="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <input type="checkbox" name="" id="menuToggler" />


                            <div tabIndex="0" id="menuContent" className=" menu border border-slate-600 bg-black text-[white]  bg-opacity-60 menu menu-compact dropdown-content my-2 p-4 shadow  rounded-box w-36 space-y-2">

                                {menuItems}
                                {!modifiedNav &&
                                    <div className="form-control w-full max-w-xs">
                                        <input
                                        onFocus={()=>navigate('/post-search')}
                                            type="text"
                                            placeholder="Search"
                                            className={`outline-0 px-2 py-1  w-full max-w-xs rounded-full bg-opacity-60 text-white bg-[grey] `}
                                            {...register("search")}
                                        />
                                    </div>
                                }
                            </div>
                            <Link to='/' className="btn btn-ghost normal-case text-3xl text-[#e50914] font-bold">Jucundu</Link>

                        </div>
                        {personalizeItems}
                    </div>


                    <div className='space-x-3'>
                        {!modifiedNav &&
                            <form className={`hidden md:block `} onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex w-[125%]">
                                    <input
                                        type="text"
                                        onFocus={()=>navigate('/post-search')}
                                        placeholder="Search movies"
                                        className={`outline-0 px-4 py-2 mt-10 md:mt-0 md:ml-20 w-full max-w-xs rounded-full bg-opacity-80 text-white bg-[grey] `}
                                        {...register("search")}
                                    />
                                    <input className='hidden bg-opacity-80 text-slate-400 bg-[grey] py-2 px-2 cursor-pointer border-l rounded-r-full pr-4' type="submit" value="Search" />

                                </div>
                            </form>

                        }

                        <div className="navbar-cente hidden lg:flex">
                            <ul className="menu menu-horizontal mt-[4%] ml-20 pb-[.6%]">
                                {menuItems}
                            </ul>
                        </div>

                        <div className=" mr-10    hidden lg:block mb-[-1%]">
                            <div className='flex items-center pb-2'>

                                {token &&

                                    <div className="dropdown dropdown-end mt-3">

                                        <input type="checkbox" name="toggle" id="bigToggler" />

                                        <label tabIndex="0" htmlFor="bigToggler" name="toggle" className="btn ml-4 btn-ghost btn-circle avatar">
                                            <div className="w-9 border border-white rounded-full" >
                                                {

                                                    <img src="https://i.ibb.co/vj0Ctmj/user.png" />
                                                }
                                            </div>
                                        </label>
                                        <ul tabIndex="0" id='profile' className=" bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[350%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl bg-opacity-60 rounded-box w-52">
                                            <div className='space-y-2 '>
                                                <Link onClick={() => setModifiedNav(false)} to="/profile">
                                                    <li>

                                                        {

                                                            <img className='w-14 border border-white  rounded-full'
                                                                src="https://i.ibb.co/vj0Ctmj/user.png" />
                                                        }

                                                    </li>
                                                </Link>
                                                {/* <Link to="/profile">
                                                <li className='font-semibold text-[white]  text-lg hover:text-[brown]  word-break'>{profile?.displayName ? profile?.displayName : user?.displayName}</li>
                                            </Link> */}
                                                {/* <li className='text-[white] text-sm  break-all'>{user.email}</li> */}

                                                <li>

                                                    <Link onClick={() => setModifiedNav(false)} to='/profile' className="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                                        View Profile
                                                    </Link>

                                                </li>
                                                <li>
                                                    {localStorage.getItem('isAdmin') &&
                                                        <Link onClick={() => setModifiedNav(true)} to='/dashboard' className="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>
                                                    }
                                                </li>

                                            </div>



                                            <div className='space-y-2 pt-4'>

                                                <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li>
                                                <Link to='/'>
                                                    <li><button onClick={logoutHandler} className='btn btn-xs'>Logout</button></li>
                                                </Link>
                                            </div>


                                        </ul>
                                    </div>

                                }

                            </div>


                        </div>
                    </div>

                </div>

            </div>



        </div>

    );
};

export default Navbar;
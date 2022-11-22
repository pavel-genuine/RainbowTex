// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import './Navbar.css'
import CustomLink from './CustomLink';

const Navbar = () => {

    const [background, setBackground] = useState(false)

    const [hideSearch, setHideSearch] = useState(false)


    const handleHideSearch = () => {
        setHideSearch(true)
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
            {
                <div class="dropdown dropdown-end ">

                    <input type="checkbox" name="toggle" id="toggler" />

                    <label tabindex="0" htmlFor="toggler" name="toggle" class="btn btn-ghost btn-circle avatar">
                        <div class="w-9 border border-[brown] rounded-full" >
                            {
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8Wygf4kyxHztYd0ep1BAq_ARXG9lxZsIosP60cyBiOSNLPRprFE126kSfSPhqNGcvNU&usqp=CAU" />
                            }
                        </div>
                    </label>
                    <ul tabindex="0" id='profile' class="bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[450%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl  bg-opacity-60 rounded-box w-52">

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

                                <Link to='/profile' class="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                    View Profile
                                </Link>
                            </li>
                            <li onClick={() => handleHideSearch()}>
                                <Link to='/dashboard' class="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>

                            </li>
                        </div>



                        <div className='space-y-2 pt-4'>

                            <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li>
                            <li><button className='btn btn-xs'>Logout</button></li>

                        </div>


                    </ul>
                </div>

            }</>


    const menuItems =
        <>
            <div className=" flex w-[99%] mt-2 md:w-[76%] text-white relative md:hidden ">

                <label tabindex="0" htmlFor='bigTogglerpro' class="">
                    <div class="indicator cursor-pointer rounded-full felx justify-center items-center">
                        <p class="btn-ghost hover:rounded font-bold md:p-3 md:m-5 mr-1" to='/'>Categories</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                </label>
                <input type="checkbox" name="" id="bigTogglerpro" />


                <ul class="space-y-2 p-4 font-bold rounded-lg notificationpro text-black absolute left-[80%] top-[100%] bg-black text-[white]  bg-opacity-60 ">
                    <div className='flex space-x-4'>
                        <div className='space-y-2'>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                        </div>
                        <div className='space-y-2'>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                        </div>
                    </div>
                </ul>
            </div>
            <div class="dropdown dropdown-hover hidden md:block">
                <label tabindex="0" class="">
                    <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/'>Categories</CustomLink>
                </label>
                <div tabindex="0" class="space-y-2 px-4 py-6 rounded-lg dropdown-content menu  ml-12 mt-3 shadow text-white bg-black bg-opacity-60 w-auto">
                    <div className='flex space-x-10'>
                        <div className='space-y-2'>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                        </div>
                        <div className='space-y-2'>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer  "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                            <CustomLink to={'/bollywood'} class="px-1 border-b-2 cursor-pointer "><a>Bollywood</a></CustomLink>
                            <CustomLink to={'/dhallywood'} class="px-1 border-b-2 cursor-pointer "><a>Dhallywood</a></CustomLink>
                            <CustomLink to={'/hollywood'} class="px-1 border-b-2 cursor-pointer "><a>Hollywood</a></CustomLink>
                        </div>
                    </div>
                </div>
            </div>
            {
                <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-up'>Sign Up</CustomLink>

            }
            {
                <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-in'>Sign In</CustomLink>
            }
        </>


    return (
        <div>

            <div className={`nav h-[70px]  fixed text-white bg-[#181818] ${background ? 'bg-opacity-80' : 'bg-opacity-20 bg-gradient-to-b from-black '} backdrop-filter-none backdrop-blur-sm shadow z-100`}>
                <div class="lg:navbar lg:w-[100vw]  mx-auto ">
                    <div class="lg:navbar-start hidden md:block">

                        <Link to='/' class=" normal-case text-xl ">
                            <img className='md:w-40 ml-20 mt-2' src="https://i.ibb.co/Mnc17bk/1-22-removebg-preview.png" alt="" />
                        </Link>
                    </div>




                    <div className='lg:hidden flex justify-between items-center p-2'>
                        <div class="dropdown">
                            <label htmlFor='menuToggler' tabindex="0" class="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <input type="checkbox" name="" id="menuToggler" />


                            <div tabindex="0" id="menuContent" class=" menu border border-slate-600 bg-black text-[white]  bg-opacity-60 menu menu-compact dropdown-content my-2 p-4 shadow  rounded-box w-36 space-y-2">

                                {menuItems}
                               {
                                !hideSearch &&  <div className="form-control w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className={`outline-0 px-2 py-1  w-full max-w-xs rounded-full bg-opacity-60 text-white bg-[grey] `}
                                // {...register("search")}
                                />
                            </div>
                               }
                            </div>
                            <Link to='/' class="btn btn-ghost normal-case text-3xl text-[#e50914] font-bold">Jucundu</Link>

                        </div>
                        {personalizeItems}
                    </div>


                    {
                        !hideSearch && <div className="form-control w-full max-w-xs hidden my-auto  md:block">
                            <input
                                type="text"
                                placeholder="Search movies"
                                className={`outline-0 px-4 py-2 ml-20 w-full max-w-xs rounded-full bg-opacity-80 text-white bg-[grey] `}
                            // {...register("search")}
                            />
                        </div>
                    }

                    <div class="navbar-center hidden lg:flex">
                        <ul class="menu menu-horizontal mt-[4%] ml-20 pb-[.6%]">
                            {menuItems}
                        </ul>
                    </div>

                    <div class=" mr-10    hidden lg:block mb-[-1%]">
                        <div className='flex items-center pb-2'>

                            {

                                <div class="dropdown dropdown-end mt-3">

                                    <input type="checkbox" name="toggle" id="bigToggler" />

                                    <label tabindex="0" htmlFor="bigToggler" name="toggle" class="btn ml-4 btn-ghost btn-circle avatar">
                                        <div class="w-9 border border-white rounded-full" >
                                            {

                                                <img src="https://i.ibb.co/vj0Ctmj/user.png" />
                                            }
                                        </div>
                                    </label>
                                    <ul tabindex="0" id='profile' class=" bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[350%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl bg-opacity-60 rounded-box w-52">
                                        <div className='space-y-2 '>
                                            <Link to="/profile">
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

                                                <Link to='/profile' class="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                                    View Profile
                                                </Link>

                                            </li>
                                            <li onClick={() => handleHideSearch()}>
                                                {
                                                    <Link to='/dashboard' class="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>
                                                }
                                            </li>

                                        </div>



                                        <div className='space-y-2 pt-4'>

                                            <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li>
                                            <Link to='/'>
                                                <li><button className='btn btn-xs'>Logout</button></li>
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

    );
};

export default Navbar;
// import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import './Navbar.css'
import CustomLink from './CustomLink';

const Navbar = () => {

    const [background, setBackground] = useState(false)

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
                                <img src="https://i.stack.imgur.com/frlIf.png" />
                            }
                        </div>
                    </label>
                    <ul tabindex="0" id='profile' class="bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[450%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl  bg-opacity-60 rounded-box w-52">

                        <div className='space-y-2'>
                            <Link to="/profile">
                                <li>
                                    <img className='w-14 border border-[brown]  rounded-full'
                                        src={"https://i.stack.imgur.com/frlIf.png"} />
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
                            <li>
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
            <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/'>Categories</CustomLink>
            {
                <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-up'>Sign Up</CustomLink>

            }
            {
                <CustomLink class="btn-ghost hover:rounded md:p-3 md:m-5" to='/sign-in'>Sign In</CustomLink>
            }
        </>


    return (
        <div>

            <div className={`nav h-[70px]  fixed text-white bg-[#181818] ${background ? 'bg-opacity-80':'bg-opacity-20 bg-gradient-to-b from-black '} backdrop-filter-none backdrop-blur-sm shadow z-100`}>
                <div class="lg:navbar lg:w-[100vw]  mx-auto ">
                    <div class="lg:navbar-start hidden md:block">

                        <Link to='/' class="btn btn-ghost normal-case text-xl "> 
                        <img className='w-40 ml-16 mt-2' src="https://i.ibb.co/Mnc17bk/1-22-removebg-preview.png" alt="" />
                        </Link>
                    </div>




                    <div className='lg:hidden flex justify-between items-center p-2'>
                        <div class="dropdown">
                            <label htmlFor='menuToggler' tabindex="0" class="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <input type="checkbox" name="" id="menuToggler" />


                            <ul tabindex="0" id="menuContent" class=" menu border border-slate-600 bg-black text-[white]  bg-opacity-60 menu menu-compact dropdown-content mt-3 p-4 shadow  rounded-box w-52">
                                {menuItems}
                            </ul>
                            <Link to='/' class="btn btn-ghost normal-case text-xl ">Jucundu</Link>

                        </div>
                        {personalizeItems}
                    </div>



                    <div class="navbar-center hidden lg:flex">
                        <ul class="menu menu-horizontal mt-[3.25%] ml-40 pb-[.6%]">
                            {menuItems}
                        </ul>
                    </div>

                    <div class=" mr-10    hidden lg:block mb-[-1%]">
                        <div className='flex items-center pb-2'>

                            {

                                <div class="dropdown dropdown-end ">

                                    <input type="checkbox" name="toggle" id="bigToggler" />

                                    <label tabindex="0" htmlFor="bigToggler" name="toggle" class="btn ml-4 btn-ghost btn-circle avatar">
                                        <div class="w-9 border border-white rounded-full" >
                                            {

                                                <img src="https://i.stack.imgur.com/frlIf.png" />
                                            }
                                        </div>
                                    </label>
                                    <ul tabindex="0" id='profile' class=" bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[350%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl bg-opacity-60 rounded-box w-52">
                                        <div className='space-y-2 '>
                                            <Link to="/profile">
                                                <li>

                                                    {

                                                        <img className='w-14 border border-white  rounded-full'
                                                            src="https://i.stack.imgur.com/frlIf.png" />
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
                                            <li>
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
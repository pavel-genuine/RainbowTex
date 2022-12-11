import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import CustomLink from './CustomLink';
import { logOut } from '../../api/api';
import useHomeCategories from '../Shared/hooks/useHomeCategories';
import { useForm } from 'react-hook-form';

const Navbar = ({ filterHandler, searchHandler }) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [background, setBackground] = useState(false)
    const [modifiedNav, setModifiedNav] = useState(false)
    const [showBorder, setShowBorder] = useState(false)

    const navigate = useNavigate()

    const { category: homeCates } = useHomeCategories()

    const token = localStorage.getItem('loginToken')
    const admin = localStorage.getItem('isAdmin')

    const logoutHandler = async () => {
        await logOut()
        localStorage?.removeItem('loginToken')
        localStorage?.removeItem('email')
        localStorage?.removeItem('userId')
        localStorage?.removeItem('isAdmin')
        localStorage.clear();
        window.location.reload();
    }

    const handleFilterCate = (id) => {

        navigate('/')
        setTimeout(() => {
            window.scrollTo(500, 500)
        }, 500);

        const singleCate = homeCates?.find(cate => cate?._id == id)
        filterHandler(singleCate)
        if (id == singleCate?._id) {
            setShowBorder(() => ({ id: id, clicked: true }))
        }
    }


    const onSubmit = (data) => {

        const searchText = data?.search?.toLowerCase()

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
                                <img src="https://i.ibb.co/vj0Ctmj/user.png" />
                            }
                        </div>
                    </label>
                    <ul tabIndex="0" id='profile' className="bg-black border border-slate-600 space-y-4 divide divide-y mt-2  w-[450%] card card-compact  dropdown-content pl-4 pr-1 pt-4 pb-4 shadow-xl  bg-opacity-60 rounded-box w-52">

                        <div className='space-y-2'>
                            {/* <Link to="/profile"> */}
                          
                            <li>
                                <img className='w-14 border border-[brown]  rounded-full'
                                    src={"https://i.ibb.co/vj0Ctmj/user.png"} />
                            </li>
                            <li className='text-salte-200'>
                                {window.localStorage?.getItem('name')}
                            </li>
                            {/* </Link> */}
                            {/* <Link to="/profile">
                                <li className='font-semibold text-[white]  text-lg hover:text-[brown]  word-break'>{user.displayName}</li>
                            </Link> */}
                            {/* <li className='text-[white] text-sm  break-all'>{user.email}</li> */}
                            {/* <li>

                                <Link to='/profile' className="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                    View Profile
                                </Link>
                            </li> */}
                            <li >
                                {
                                    localStorage.getItem('isAdmin') &&
                                    <Link onClick={() => setModifiedNav(true)} to='/dashboard' className="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>

                                }
                            </li>
                        </div>

                        <div className='space-y-2 pt-4'>

                            {/* <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li> */}
                            <li><button onClick={logoutHandler} className='btn btn-xs'>Logout</button></li>

                        </div>


                    </ul>
                </div>

            }</>


    const menuItems =
        <>
            <div className=" flex w-[99%] mt-2 md:w-[76%] text-white relative lg:hidden ">

                <label tabIndex="0" htmlFor='bigTogglerpro' className="">
                    {!modifiedNav && <div className="indicator cursor-pointer rounded-full felx justify-center items-center">

                        <a className={`btn-ghost hover:rounded font-bold  mr-1 border-b-2 ${showBorder?.id ? ' border-b-[red]' : ''}`} >Categories</a>
                    </div>}
                </label>
                <input type="checkbox" name="" id="bigTogglerpro" />
                {/* sm  */}

                <ul className="md:space-y-2 py-1 md:p-4 font-bold rounded-lg notificationpro text-black absolute top-[325%] left-[0%]  md:left-[145%] md:top-[-50%] bg-black text-[white]  bg-opacity-60 ">
                    <ul className='grid grid-cols-2 w-[85vw] md:w-[45vw] mx-auto'>
                        {<CustomLink onClick={(id) => setShowBorder({ id: 1 })} to={`/post-search`} className="border-b-2 ml-4 mt-4 cursor-pointer ">
                            All Movies</CustomLink>}
                        {
                            homeCates.length > 0 &&
                            homeCates.map(item => {
                                return <li key={item?._id} onClick={(id) => handleFilterCate(item?._id)}><CustomLink to='/home' className={` border-b-2 cursor-pointer ${showBorder?.id == item?._id ? 'border-[red]' : ''}`}>{item?.categoryName}</CustomLink></li>
                            })
                        }
                    </ul>
                </ul>
            </div>

            <div className="dropdown dropdown-hover hidden lg:block relative">
                {!modifiedNav &&
                    <label tabIndex="0" className="">
                        <a className={`btn-ghost hover:rounded md:p-3 md:m-5 font-bold text-lg border-2 ${showBorder?.id ? ' border-b-[red]' : ''}`} >Categories</a>
                    </label>
                }
                <div tabIndex="0" className="px-4 py-6 abolute right-[30%] rounded-lg dropdown-content menu  mt-3 shadow text-white bg-black bg-opacity-60 w-auto">
                    {/* lg  */}
                    {<CustomLink onClick={(id) => setShowBorder({ id: 1 })} to={`/post-search`} className="border-b-2 ml-4 mt-4 cursor-pointer ">
                        All Movies</CustomLink>}
                    <ul className='md:grid grid-cols-2 md:w-[30vw] mt-4 mx-auto'>

                        {
                            homeCates?.length > 0 &&
                            homeCates.map(item => {
                                return <li key={item?._id} onClick={(id) => handleFilterCate(item?._id)}><CustomLink to='/home' className={` border-b-2 cursor-pointer ${showBorder?.id == item?._id ? 'border-[red]' : ''}`}>{item?.categoryName}</CustomLink></li>
                            })
                        }

                    </ul>

                </div>
            </div>
            {!token &&
                <CustomLink onClick={() => setModifiedNav(true)} className="btn-ghost hover:rounded lg:p-3 lg:m-5" to='/sign-up'>Sign Up</CustomLink>

            }
            {!token &&
                <CustomLink onClick={() => setModifiedNav(true)} className="btn-ghost hover:rounded lg:p-3 lg:m-5" to='/sign-in'>Sign In</CustomLink>
            }
        </>


    return (
        <div >

            <div className={`nav h-[70px]  fixed text-white bg-[#181818] ${background ? 'bg-opacity-80' : 'bg-opacity-20 bg-gradient-to-b from-black '} backdrop-filter-none backdrop-blur-sm shadow z-100`}>
                <div className="lg:navbar lg:w-[100vw]  mx-auto lg:flex justify-around items-center">
                    <div className="lg:navbar-start hidden lg:block">
                        <a onClick={() => setModifiedNav(false)} href='/' className=" normal-case text-xl ">
                            <img className='md:w-40 ml-20 mt-2' src="https://i.ibb.co/Mnc17bk/1-22-removebg-preview.png" alt="" />
                        </a>
                    </div>

                    <div className='lg:hidden flex justify-between items-center p-2'>
                        <div className="dropdown">
                            <label htmlFor='menuToggler' tabIndex="0" className="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <input type="checkbox" name="" id="menuToggler" />


                            <div tabIndex="0" id="menuContent" className=" menu mx-2 border border-slate-600 bg-black text-[white]  bg-opacity-60 menu menu-compact dropdown-content my-2 p-4 shadow w-[80%] md:w-[100%]  rounded-box w-36 space-y-2">

                                {menuItems}
                                {!modifiedNav &&
                                    <div className="form-control w-full max-w-xs">
                                        <input
                                            onFocus={() => navigate('/post-search')}
                                            type="text"
                                            placeholder="Search"
                                            className={`outline-0 px-2 py-1  w-full rounded-full bg-opacity-60 text-white bg-[grey] `}
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
                            <form className={`hidden lg:block `} onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex w-[125%]">
                                    <input
                                        type="text"
                                        onFocus={() => navigate('/post-search')}
                                        placeholder="Search movies"
                                        className={`outline-0 px-4 py-2 mt-10 md:mt-0 md:ml-20 w-full max-w-xs rounded-l-full bg-opacity-80 text-white bg-[grey] `}
                                        {...register("search")}
                                    />
                                    <button className='bg-opacity-80 text-slate-400 bg-[grey] py-2 px-2 cursor-pointer rounded-r-full pr-4' type="submit"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    </button>
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
                                                {/* <Link onClick={() => setModifiedNav(false)} to="/profile"> */}

                                              
                                                <li>

                                                    {

                                                        <img className='w-14 border border-white  rounded-full'
                                                            src="https://i.ibb.co/vj0Ctmj/user.png" />
                                                    }

                                                </li>
                                                <li className='text-salte-200'>
                                                    {window.localStorage?.getItem('name')}
                                                </li>
                                                {/* </Link> */}
                                                {/* <Link to="/profile">
                                                <li className='font-semibold text-[white]  text-lg hover:text-[brown]  word-break'>{profile?.displayName ? profile?.displayName : user?.displayName}</li>
                                            </Link> */}
                                                {/* <li className='text-[white] text-sm  break-all'>{user.email}</li> */}

                                                {/* <li>

                                                    <Link onClick={() => setModifiedNav(false)} to='/profile' className="  btn bg-[brown] border-none text-[white] btn-xs mx-auto">
                                                        View Profile
                                                    </Link>

                                                </li> */}
                                                <li>
                                                    {admin &&
                                                        <Link onClick={() => setModifiedNav(true)} to='/dashboard' className="btn bg-[green] border-none text-[white] btn-xs">Dashboard</Link>

                                                    }
                                                </li>

                                            </div>



                                            <div className='space-y-2 pt-4'>

                                                {/* <li><a className='btn btn-outline btn-xs text-[white]'>Settings</a></li> */}
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
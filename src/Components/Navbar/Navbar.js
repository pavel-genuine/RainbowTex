import { signOut } from 'firebase/auth';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';

import './Navbar.css'
import MobileMenu from './MobileNav';

export const menuItems =
<>
    <CustomLink class=" md:p-3 md:m-5 hover:text-" to='/'>HOME</CustomLink>
    <CustomLink class=" md:p-3 md:m-5 hover:text-textPrimary" to='/stories'>STORIES</CustomLink>
    <CustomLink class=" md:p-3 md:m-5 hover:text-textPrimary" to='/csr'>CSR</CustomLink>
    <CustomLink class=" md:p-3 md:m-5 hover:text-textPrimary" to='/career'>CAREER</CustomLink>

    <CustomLink class="md:p-3 md:m-5 hover:text-textPrimary" to='/about'> ABOUT </CustomLink>
    <CustomLink class="md:p-3 md:m-5 hover:text-textPrimary" to='/contact'>CONTACT </CustomLink>
</>

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




 


    return (
        <div className='w-[100vw]'>

            <div id='' style={{ transition: "all .5s",}} className=
                {`nav h-[60px] md:h-[80px]  fixed  ${!background ? 'bg-opacity-30 bg-navBg' : 'bg-opacity-90 bg-navBg'} `}
            >
                <div class="lg:navbar lg:w-[82%] mx-auto lg:flex my-4  ">
                    <div class="lg:navbar-start hidden md:block">


                        <Link to='/' class=" normal-case text-xl ">
                            <img
                                className='w-[35%] '
                                src="https://i.ibb.co/nRLv9G8/rainbowtex-removebg-preview.png" alt="" srcset=""
                            />

                        </Link>
                    </div>


                    <div className='lg:hidden'>
                        <div class="flex ">
                            <div className='lg:hidden'>
                                <MobileMenu></MobileMenu>
                            </div>
                            <Link to='/' class=" normal-case text-xl ml-5  ">
                                <img
                                    className='w-[60%]'
                                    src="https://i.ibb.co/nRLv9G8/rainbowtex-removebg-preview.png" alt="" srcset=""
                                />

                            </Link>
                        </div>
                    </div>



                    <div class="navbar-center hidden lg:block lg:mt-[8px] ">
                        <ul class="menu lg:flex menu-horizontal ml-[-30%]">
                            {menuItems}
                        </ul>
                    </div>

                </div>

            </div>



        </div>

    );
};

export default Navbar;
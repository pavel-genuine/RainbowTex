import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <div className='py-10 bg-navBg text-[white] px-4 border-t'>
            <div className='lg:w-[82%] w-[90%] mx-auto lg:flex justify-around  '>
                <div className='lg:border-r lg:pr-[18.5%] '>
                    <motion.div
                        initial={{ y: 40 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: .2, delay: .2, }}
                    >
                        <p className='lg:text-3xl text-xl font-bold mb-5 '>
                            Quick Links
                        </p>
                    </motion.div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ y: 40 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: .2, delay: .2, }}
                    >
                        <div className='grid lg:grid-cols-2 text-[grey] gap-3  '>
                            <Link to={'/contact'}><p>Contact Us</p> </Link>
                            <Link to={'/about'}><p>About Us</p> </Link>
                            <Link to={'/about'}><p className='lg:mr-10'>Management</p> </Link>
                            <Link to={'/stories'}><p>Stories</p> </Link>
                            <Link to={'/csr'}><p>CSR</p> </Link>
                            <Link to={'/career'}><p className='mb-10 lg:mb-0'>Career</p> </Link>

                        </div>
                    </motion.div>
                </div>
                <div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ y: 40 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: .2, delay: .2, }}
                    >
                        <p className='lg:text-3xl text-xl font-bold mb-5 '>
                            Contact
                        </p>
                    </motion.div>
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ y: 40 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: .2, delay: .2, }}
                    >
                        <ul className='text-[grey]  lg:w-[300px]'>
                            House 02 (1st Floor),

                            Road 04,

                            Sector 09, Uttara,

                            Dhaka-1230, Bangladesh,
                            <br />
                            <br />
                            <a className='underline' href="tel:+880 1711813933"> <span className='text-[white] font-bold cursor-pointer bg-[grey] px-2 rounded-lg '>  Call Now </span> : +880 1711813933 </a>
                            <br />
                            <br />
                            <a className='underline' href="mailto:info@rainbowtexbd.com"> <span className='text-[white]  font-bold cursor-pointer bg-[grey] px-2 rounded-lg '> Mail Us</span> : info@rainbowtexbd.com </a>
                        </ul>
                    </motion.div>
                </div>

            </div>

            <div className='text-[grey] lg:text-center mt-10 px-4  '>
                <p className='mb-2'>
                    © 2023 Rainbow Tex all rights reserved.
                </p>
                
                <a href="https://joynulabedin.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <p>
                        Made by Torque360
                    </p>
                </a>




            </div>
        </div>
    )
}

export default Footer
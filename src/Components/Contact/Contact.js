import React, { useEffect } from 'react'

import { motion } from "framer-motion"
import { Button } from '@mui/material'

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <motion.div
                viewport={{ once: true }}
                initial={{ y: 500, opacity: .5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0, }}
            >
                <motion.div
                    className=' text-[white] absolute top-[7vh] lg:top-60 left-[6vw] lg:left-[40vw] font-bold'
                    viewport={{ once: true }}
                    initial={{ y: 500, opacity: .5 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0, }}
                >
                    <h1 className='text-4xl  mt-40 mb-5 text-center'>
                        Contact Us
                    </h1>

                    <p className='text-xl lg:text-2xl text-center'>
                        We would like to hear from you
                    </p>
                    <div className='lg:flex lg:my-10 mx-16 lg:mx-0'>
                        <div className='my-5 lg:my-0 lg:mr-20'>
                            <Button className='lg:w-[200px] w-[50vw] h-[50px]  ' variant="contained">
                                <a href="mailto:info@rainbowtexbd.com" className='text-xl font-bold text-[white]' type="submit" >Email Us</a>
                            </Button>

                        </div>
                        <div>

                            <Button className='lg:w-[200px] w-[50vw]  h-[50px]' variant="contained">
                                <a href="tel:+880 1711813933" className='text-xl font-bold text-[white]'>Call Now </a> </Button>

                        </div>
                    </div>
                </motion.div>
                <img className='w-[100vw] h-[80vh] lg:h-[100vh]' src="https://i.ibb.co/PxHYmK2/Screenshot-2023-04-14-162210.png" alt="" />
            </motion.div>

        </div>
    )
}

export default Contact
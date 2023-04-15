import React, { useEffect } from 'react'

import { motion } from "framer-motion"
import { Button } from '@mui/material'
import MissionVision from '../MissionVision/MissionVision'

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <motion.div
                viewport={{ once: true }}
                initial={{ y: 300, opacity: .5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: .2, }}
            >
                <motion.div
                    className=' text-textPrimary absolute top-[13vh] lg:top-60 px-2 lg:left-[35vw] font-bold'
                    viewport={{ once: true }}
                    initial={{ y: 300, opacity: .5 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0, }}
                >
                    <h1 className='text-5xl mt-40 mb-5 text-center'>
                        About Us

                    </h1>
                    <p className='text-xl lg:text-2xl text-center'>
                        We are a rapidly growing conglomerate, working in  RMG in Bangladesh.
                    </p>

                </motion.div>
                <img className='w-[100vw] h-[80vh] lg:h-[100vh]' src="https://i.ibb.co/LQdTQhG/Fiduciary-Responsibility-Board-of-Directors-ESG-1.jpg" alt="" />
            </motion.div>
            <MissionVision></MissionVision>

        </div>
    )
}

export default About
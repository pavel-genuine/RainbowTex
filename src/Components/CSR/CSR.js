import React, { useEffect } from 'react'

import { motion } from "framer-motion"
import { Button } from '@mui/material'
import MissionVision from '../MissionVision/MissionVision'
import Passion from '../Passion/Passion'

const CSR = () => {

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
                    className=' text-[black] absolute top-[3vh] lg:top-60 px-2  lg:left-[25vw] font-bold'
                    viewport={{ once: true }}
                    initial={{ y: 300, opacity: .5 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0, }}
                >
                    <h1 className='lg:text-5xl text-3xl  mt-40 mb-5 text-center'>
                        Corporate Social Responsibility

                    </h1>
                    <p className='text-xl lg:text-2xl text-center'>
                        A socially responsible organisation with the aim to serve the communities we work in.                    </p>

                </motion.div>
                <img className='w-[100vw] h-[70vh] lg:h-[100vh]'
                    src="https://i.ibb.co/S6yvBy7/Screenshot-2023-04-15-001158.png" alt="" />
            </motion.div>
            <Passion csr={true}></Passion>

        </div>
    )
}

export default CSR
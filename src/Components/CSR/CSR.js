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
                    className=' text-[white] absolute  font-bold'
                    viewport={{ once: true }}
                    initial={{ y: 300, opacity: .5 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0, }}
                >
                  <div className='flex justify-center items-center h-[100vh] w-[99.5vw] bg-[black] bg-opacity-40'>
                  <div>
                  <h1 className='lg:text-5xl text-3xl   text-center mb-4'>
                        Corporate Social Responsibility

                    </h1>
                    <p className='text-xl lg:text-2xl text-center px-7'>
                        A socially responsible organisation with the aim to serve the communities we work in.                    </p>

                    </div>
                  </div>

                </motion.div>
            <img className='w-[100vw] h-[100vh] ' src="https://i.ibb.co/S6yvBy7/Screenshot-2023-04-15-001158.png" alt="" />
            </motion.div>

            <Passion csr={true}></Passion>

        </div>
    )
}

export default CSR
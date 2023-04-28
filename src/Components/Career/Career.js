import React, { useEffect } from 'react'

import { motion } from "framer-motion"
import { Button } from '@mui/material'
import MissionVision from '../MissionVision/MissionVision'
import Passion from '../Passion/Passion'

const Career =  ({setIsHome}) => {

    useEffect(() => {
        setIsHome(false)
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
                  <h1 className='text-5xl  text-center mb-4'>
                        Career

                    </h1>
                <p className='text-xl lg:text-2xl text-center px-7'>
                        Please keep an eye on the LinkedIn and BDJobs websites for any relevant openings. Due to the high volume of applications, only those who meet the minimum requirements will be contacted for the written exam and interview. The business retains the right to modify the selection or recruitment decision. Mail us your CV for consideration right away.
                    </p>
                    </div>
                  </div>

                </motion.div>
                <img className='w-[100vw] h-[100vh] '
                    src="https://i.ibb.co/Ryvrphr/researchjobs-Yurolaits-Albert-i-Stockjpg.jpg" alt="" />
                    </motion.div>

            <Passion career={true}></Passion>

        </div>
    )
}

export default Career
import React, { useEffect } from 'react'
import { useState } from 'react'
import { motion } from "framer-motion"


const Landing = () => {


    return (
        <motion.div className=' w-[70%] md:w-[40%]'
            initial={{ opacity:1, scale: .5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5, delay: .2 }}
        >
            <img
                src="https://i.ibb.co/nRLv9G8/rainbowtex-removebg-preview.png" alt="" srcset=""
            />
        </motion.div>
    )
}

export default Landing
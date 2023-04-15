import React, { useEffect } from 'react'
import { useState } from 'react'
import { motion } from "framer-motion"


const Landing = () => {


    return (
        <motion.div className=' w-[70%] md:w-[40%]'
            initial={{ opacity: 0, scale: .2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: .2 }}
        >
            <img
                src="https://i.ibb.co/nRLv9G8/rainbowtex-removebg-preview.png" alt="" srcset=""
            />
        </motion.div>
    )
}

export default Landing
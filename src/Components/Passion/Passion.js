import React from 'react'

import { motion } from "framer-motion"

const Passion = ({ career, csr }) => {
    return (
        <div>
            <div className='w-[100vw] lg:hidden  h-[5vh]  bg-textPrimary'>

            </div>
            <div className='flex lg:flex-row flex-col-reverse'>

                <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: .5, scale: .9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .7, delay: 0 }}
                >
                    <div className='bg-textPrimary opacity-80 text-[white] w-[80%] mx-auto mt-[-40px] lg:mt-0 lg:w-[50vw]  lg:h-[70vh] p-4 lg:p-10 text-center '>
                        <h1 className='lg:text-5xl text-2xl font-bold mb-5 mt-5 lg:mt-20'>
                            Consistant  production that is driven by passion and brilliantly crafted for the future
                        </h1>
                        <div className='w-[100px] h-[3px] bg-[white] mb-10 lg:mb-16 mx-auto'>

                        </div>
                        <p className='text-lg lg:text-xl '>
                            Our agglomerate, which is expanding quickly, operates in a number of sectors of RMG. Eurooe, America, Australia & Middle-east are just a few of the regions where we conduct business.
                        </p>
                    </div>

                </motion.div>

                <motion.div
                    viewport={{ once: true }}
                    initial={{ opacity: .5, scale: .9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .7, delay: 0 }}
                >
                    <img className={`h-[50vh] lg:h-[70vh] mx-auto `} src={career ?
                        "https://i.ibb.co/1ZhSdV0/Screenshot-2023-04-14-191645.png"
                        : csr ? "https://i.ibb.co/ss39dQX/Screenshot-2023-04-15-000831.png"
                            :
                            "https://i.ibb.co/8cdj540/Screenshot-2023-04-14-115857.png"} alt="" />
                </motion.div>

            </div>
        </div>
    )
}

export default Passion
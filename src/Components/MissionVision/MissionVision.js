import React from 'react'
import { motion } from 'framer-motion'


const MissionVision = () => {
    return (
        <div className='py-10'>
            <div className='lg:w-[82%] w-[90%] mx-auto'>
                <motion.div
                    viewport={{ once: true }}
                    initial={{ y: 40, opacity: .1 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .2, delay: 0, }}
                >
                    <p className='lg:text-5xl text-xl font-bold mb-5 '>
                        High-end quality, top priority on customer-service & ethical standards are being upheld as we move forward.
                    </p>
                    <div className='w-[200px] h-[3px] bg-textPrimary lg:mb-14 mb-8'>      </div>
                </motion.div>

                <motion.h2
                    viewport={{ once: true }}
                    initial={{ y: 40, opacity: .1 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .2, delay: .2, }}
                    className=''>
                    <span className='text-xl lg:text-3xl font-semibold mb-3 text-textPrimary'>
                        Vision
                    </span>
                    <p className='mb-5 lg:mb-14 mt-3 text-[16px] lg:text-[18px] '>
                        To become a reliable global organization that provides excellence and quality through innovation with a forward-looking approach.
                    </p>
                </motion.h2>

                <motion.h2
                    viewport={{ once: true }}
                    initial={{ y: 40, opacity: .1 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .2, delay: .4, }}
                    className=''>
                    <span className='text-xl lg:text-3xl font-semibold mb-3 text-textPrimary'>
                        Mission
                    </span>
                    <p className='mb-5 lg:mb-14 mt-3 text-[16px] lg:text-[18px] '>
                        Creating a secure and fulfilling work environment in order to establish an ethical business standard.
                        Utilizing eco-friendly technologies with a knowledgeable and trained workforce to provide the highest level of customer satisfaction.
                    </p>
                </motion.h2>

                <motion.h2
                    viewport={{ once: true }}
                    initial={{ y: 40, opacity: .1 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: .2, delay: .6, }}
                    className=''>
                    <span className='text-xl lg:text-3xl font-semibold mb-3 text-textPrimary'>
                        Values
                    </span>
                    <br />
                    <p className='text-lg lg:font-emibold my-3 '>
                        Ownership
                    </p>
                    <p className='mb-3 text-[16px] lg:text-[18px] '>
                        We respect property rights. Since we are all owners of the company, we view our relationship with our employees as mutual.</p>
                    <p className='text-lg lg:font-semibold mb-3 '>
                        Excellence
                    </p>
                    <p className='mb-3 text-[16px] lg:text-[18px] '>
                        We put forth all of our effort to be the best in every area of our business and take on every challenge with a spirit of success.
                    </p>
                    <p className='text-lg lg:font-semibold mb-3'>
                        Social Responsibility
                    </p>
                    <p className='mb-3 text-[16px] lg:text-[18px] '>
                        We are concerned about the future. Green technology and management always ensure environmental protection.
                    </p>
                    <p className='text-lg lg:font-semibold mb-3 '>
                        Recognition and Reward
                    </p>

                    <p className='mb-3 text-[16px] lg:text-[18px] '>
                        The self-esteem and satisfaction of our employees will rise when their efforts are recognized & thus excellence come out.

                    </p>
                </motion.h2>
            </div>

        </div>
    )
}

export default MissionVision
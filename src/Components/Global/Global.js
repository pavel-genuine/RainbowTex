import React, { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from "framer-motion"

const Global = () => {

    const count = useMotionValue(0)
    const count2 = useMotionValue(0)
    const count3 = useMotionValue(0)
    const count4 = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.floor(latest))
    const rounded2 = useTransform(count2, latest => Math.round(latest))
    const rounded3 = useTransform(count3, latest => Math.round(latest))
    const rounded4 = useTransform(count4, latest => Math.round(latest))

    useEffect(() => {
        const controls = animate(count, 99, { duration: 10 })
        const controls2 = animate(count2, 24, { duration: 10 })
        const controls3 = animate(count3, 7, { duration: 10 })
        const controls4 = animate(count4, 99, { duration: 10 })

        return controls.stop

    }, [])

    // console.log(rounded,'rrrrrrr');

    return (
        <div className=' bg-navBg pt-[5vh] h-[75vh] lg:h-auto'>
            <motion.div
                viewport={{ once: true }}
                initial={{ opacity: .5, scale: .7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: .7, delay: 0 }}
            // transformValues={'-200px'}
            // transform= isInView ? "none" : "translateX(-200px)"
            >
                <div className='lg:mt-10 mt-[5vh] text-[white] '>
                    <div className='h-[12.5vh] lg:h-auto'>
                        <h2 className='lg:text-3xl text-2xl text-textPrimary  text-center font-semibold mb-3'>Ready For Enterprise</h2>
                        <h2 className='lg:text-lg   text-center text-slate-400 lg:mt-8 px-2'>Rainbow Tex is built by the team that created the goods <span className='lg:hidden'>for some of the amazing buyers globally.</span></h2>
                        <h2 className='lg:text-lg  text-center text-slate-400 hidden lg:block'>for some of the amazing buyers globally.</h2>
                    </div>

                    <div className='lg:my-8 my-[5vh] h-[12.5vh] lg:h-auto'>
                        <div className='flex text-textPrimary justify-center items-center space-x-16 lg:mb-4 lg:text-5xl text-3xl  font-semibold'>
                            <div className='flex'>
                                <motion.h1 className='lg:text-5xl text-3xl   font-semibold'>{rounded}</motion.h1>{'.'}
                                <motion.h1 className='lg:text-5xl text-3xl  font-semibold'>{rounded4}</motion.h1>{'%'}
                            </div>
                            <div className='flex'>
                                <motion.h1 className='lg:text-5xl text-3xl  font-semibold'>{rounded2}</motion.h1>{'  X'}
                                <motion.h1 className='lg:text-5xl text-3xl  font-semibold'>{rounded3}</motion.h1>
                            </div>
                        </div>
                        <div className='flex justify-center items-center space-x-10 lg:space-x-12'>
                            <h2 className='lg:text-xl  text-center text-slate-400'>Guaranteed Uptime</h2>
                            <h2 className='lg:text-xl  text-center text-slate-400'>Expert Support</h2>
                        </div>
                    </div>

                    <div className='flex justify-center h-[30vh] lg:h-auto '>
                        <img className='md:w-[85vw] w-[100vw]' src={'https://i.ibb.co/PDZCY7h/globe-975be501addf74160239.png'} alt="" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Global;
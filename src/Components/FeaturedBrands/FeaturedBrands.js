import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion"


const FeaturedBrands = () => {
    return (
        <motion.div className=''
            viewport={{ once: true }}
            initial={{ opacity: .5, scale: .7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: .7, delay: 0 }}
        >
            <div className="lg:w-[82.5vw] h-[50vh]  mx-auto text-navBg">

                <div class="max-w-[100vw] mx-auto px-2 mt-[5vh] lg:mt-10">
                    <div class="">
                        <h2 class=" text-textPrimary lg:text-3xl text-2xl mb-[2vh] lg:mb-3 font-semibold text-center lg:my-4  mb-1 mt-3 ">Working With Amazing Brands </h2>
                        <p className=" lg:text-xl   text-center lg:mb-8 mb-[5vh]">We deliver attires of almost all the famous brands  worldwide.</p>
                        <div className="shadow p-8 lg:p-10 rounded-lg">
                            <Marquee speed={50}>
                                <div className="flex justify-center items-center space-x-16 mb-[5vh] lg:mb-10 ">
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/NZWzfn7/zara-logo-2020-1.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/2vnrbQn/tommy-hilfiger-editorial-symbol-logo-red-and-blue-with-name-clothes-design-icon-free-vector.jpg'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/ngC43YT/1a702938c17350eee0b6f638ec152db1.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/2MfcHKB/download.jpg'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/KG5dbyz/585991924f6ae202fedf28d7.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/BtZLffW/499-4994457-old-navy-hd-png-download.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/PhTsBds/download-4.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30 pr-10 lg:pr-0 " src={'https://i.ibb.co/gmqQ0v9/e847e41ac9713cf26034ce6c40a31aed-mango-logo-fashion-logos.jpg'} alt="" />
                                </div>
                            </Marquee>
                            <Marquee speed={50} direction="right">
                                <div className="flex justify-center items-center space-x-16 lg:mb-8 mb-4 ">
                                <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/NZWzfn7/zara-logo-2020-1.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/2vnrbQn/tommy-hilfiger-editorial-symbol-logo-red-and-blue-with-name-clothes-design-icon-free-vector.jpg'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/ngC43YT/1a702938c17350eee0b6f638ec152db1.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/2MfcHKB/download.jpg'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/KG5dbyz/585991924f6ae202fedf28d7.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/BtZLffW/499-4994457-old-navy-hd-png-download.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30" src={'https://i.ibb.co/PhTsBds/download-4.png'} alt="" />
                                    <img className="h-14 w-32 lg:h-20 lg:w-40 opacity-30 pr-10 lg:pr-0 " src={'https://i.ibb.co/gmqQ0v9/e847e41ac9713cf26034ce6c40a31aed-mango-logo-fashion-logos.jpg'} alt="" />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedBrands;

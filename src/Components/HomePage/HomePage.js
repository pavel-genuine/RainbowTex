import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

import { motion } from "framer-motion"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import './HomePage.css'
import { GreatThings, BeautifulQuestions, SignalNoise, Thursday, ReadySetGo, SunnyMorning } from 'moving-letters'




export const Text = () => {

  return (
    <div className='flex'>
      <SunnyMorning text='Rainbow ' />
      <div className='ml-5'>
        <SunnyMorning text='Tex' />
      </div>

    </div>
  )
}




export const Demo = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)


    setTimeout(() => {
      setIsOpen(false)
    }, 2000)

  }, [])


  return (
    <div className='container'>
      
      <div className='pic' id='pic3' />
      <div className='pic' id='pic2' />
      <div className='pic' id='pic1' />
    </div>
  );
};


const posts = [

  {
    text: 'The fabric is durable, comfortable, and have a good drape.',
    url: 'https://i.ibb.co/HxTrBkG/Screenshot-2023-04-13-005359.png',
    _id: 3
  },
  {
    text: 'The stitching is neat, strong, and free from loose threads or skipped stitches.',
    url: 'https://i.ibb.co/VS6xQSX/Screenshot-2023-04-13-005600.png',
    _id: 4
  },
  {
    text: 'The garment is fit well, be flattering, and comfortable to wear.',
    url: 'https://i.ibb.co/ph0dNs0/Screenshot-2023-04-13-005549.png',
    _id: 5
  },
  {
    text: 'The finishing is clean, with no rough edges, and properly aligned buttons, zippers, or hooks.',
    url: 'https://i.ibb.co/stLwtW3/Screenshot-2023-04-13-005523.png',
    _id: 6
  },
  {
    text: 'The finishing is clean, with no rough edges, and properly aligned buttons, zippers, or hooks.',
    url: 'https://i.ibb.co/WsJxRQY/Screenshot-2023-04-15-133944.png',
    _id: 66
  },
  {
    text: 'The garment is made with sustainable and eco-friendly materials and processes.',
    url: 'https://i.ibb.co/ZHWFDjN/Screenshot-2023-04-15-132629.png',
    _id: 7
  },
  {
    text: 'The fabric is durable, comfortable, and have a good drape.',
    url: 'https://i.ibb.co/k1gCrtx/Screenshot-2023-04-15-133548.png',
    _id: 77
  },
  {
    text: 'The price is reflect the quality of the garment and be competitive with other similar products.',
    url: 'https://i.ibb.co/j4WbrTz/Screenshot-2023-04-13-051252.png',
    _id: 8
  },
  {
    text: 'The finishing is clean, with no rough edges, and properly aligned buttons, zippers, or hooks.',
    url: 'https://i.ibb.co/qMqfMp7/Screenshot-2023-04-15-132837.png',
    _id: 9
  },
  {
    text: 'The price is reflect the quality of the garment and be competitive with other similar products.',
    url: 'https://i.ibb.co/3r6mGPj/Screenshot-2023-04-15-132858.png',
    _id: 99
  },


]


const SinglePost = ({ post }) => {

  return (
    <div className='relative '>
      <div className=''>
        <motion.div
          viewport={{ once: true }}
          initial={{ y: 40, opacity: .5 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: .2, delay: 0, }}
        >
          <p className=' w-[100vw] bg-black bg-opacity-40 pt-[70%] lg:py-[22%] px-5 lg:px-20  absolute h-[100vh] text-center text-[white] text-3xl lg:text-6xl'>
            {post?.text}
          </p>
        </motion.div>
      </div>
      <motion.div className=''
        initial={{ opacity: 1, scale: 2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5, delay: .2 }}
      >
        <img className='h-[94.5vh] lg:h-[100vh] w-[100%] object-cover' src={post?.url} alt="" />
      </motion.div>
    </div>
  )
}

const HomePage = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    dotsClass: 'absolute bottom-3  slick-dots'

  };

  const [isOpen, setIsOpen] = useState(false)
  const [background, setBackground] = useState(false)

  const changeBackground = () => {

    if (window.scrollY >=20) {
      setBackground(true)
      // handleScroll()

    } else {
      setBackground(false)

    }
  }

  window.addEventListener('scroll', changeBackground)

  const handleScroll = () => {
    const element = document.getElementById('section');

    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({behavior:'smooth'});
    }
  };

  useEffect(() => {

    setTimeout(() => {
      setIsOpen(true)
    }, 1000)

  }, [])

  return (
    <div className=' '>
      <div className='w-[100%] mx-auto lg:h-[100vh] h-[93vh]  '>

        {
          <div className='relative'>
            <div className='flex justify-center items-center'>
              {
                !isOpen ?
                  <div className=' h-[100vh] w-[99] flex justify-center items-center'>
                    <div className='scale-[.8] lg:scale-[1.5] '>

                      <Text></Text>
                    </div>
                  </div>

                  :
                  <div className='absolute  z-10 top-[46.5%]  lg:top-[45%] '>

                    <h1 style={{ fontWeight: '800' }} className='scale-[.8] lg:scale-[1.5] text-6xl animate-charcter'>
                      Rainbow Tex
                    </h1>
                  </div>

              }
            </div>

            <div className='cursor-pointer' onClick={()=>handleScroll()}>
              <motion.div
                className=' text-[white] absolute  font-bold z-10 top-[85%] lg:left-[45.5%] left-[40%]  '
                initial={{ y: 40, opacity: .5 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: .2, delay: 0, }}
              >
                <p className='  text-lg font-bold text-[black] text-center mb-[-12px]'>
                  scroll
                </p>
                <marquee direction='right'><div className=' bg-[black] h-[2px] w-[75px]'>

                </div></marquee>


              </motion.div>

            </div>
            <div className='z-0'>
              <Demo></Demo>
            </div>
          </div>
        }

      </div>

    </div>
  )
}

export default HomePage
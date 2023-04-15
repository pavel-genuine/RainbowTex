import React from 'react'
import Slider from 'react-slick';

import { motion } from "framer-motion"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const ParticlesDiv = () => {
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0d47a1",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
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
    text:'The fabric is durable, comfortable, and have a good drape.',
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
      <img className='h-[94.5vh] lg:h-[100vh] w-[100%]' src={post?.url} alt="" />
    </div>
  )
}

const HomePage = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    speed: 1500,
    dotsClass: 'absolute bottom-3  slick-dots'

  };

  return (
    <div className=' '>
      <div className='w-[100%] mx-auto  '>
        <motion.div className=''
        //  initial={{
        //   y: -300
        // }}
        //  whileInView={{
        //   y: 0,
        //   // rotate: -10,
        //   transition: {
        //     type: "spring",
        //     bounce: 0.1,
        //     duration: 0.5
        //   }}}
        //   viewport={{ once: true, amount: 0.5 }}
        >
          <Slider {...settings}>
            {/* <div className='relative '>
           
            <ParticlesDiv></ParticlesDiv>
          </div> */}

            {
              posts.map((post) => <SinglePost key={post?._id} post={post} ></SinglePost>)

            }
          </Slider>
        </motion.div>
      </div>

    </div>
  )
}

export default HomePage
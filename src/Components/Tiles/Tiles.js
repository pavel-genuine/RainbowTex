import React from 'react'
import { motion } from "framer-motion"
import img1 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-04.webp'
import img2 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-11.webp'
import img3 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-12.webp'
import img4 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-14.webp'
import img5 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-15.webp'
import img6 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-16.webp'
import img7 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-17.webp'
import img8 from '../../assets/logos/the-inspirations-behind-20-of-the-most-well-known-logos-in-high-fashion-19.webp'

const posts = [
    {
        id: 1,
        img: img1,
        text: ''
    },
    {
        id: 2,
        img: img2,
        text: ''
    },
    {
        id: 3,
        img: img3,
        text: ''
    },
    {
        id: 4,
        img: img4,
        text: ''
    },
    {
        id: 5,
        img: img5,
        text: ''
    },
    {
        id: 6,
        img: img6,
        text: ''
    },
    {
        id: 7,
        img: img7,
        text: ''
    },
    {
        id: 8,
        img: img8,
        text: ''
    },
]

const Tile = ({ img }) => {
    return (
        <div className='w-[99.5vw] h-[33vh] lg:h-[18vw] lg:w-[25vw] overflow-hidden border-[.1px] border-[grey]'>
            <motion.div
                className=' '

                initial={{ y: -10, }}
                whileHover={{ y: 0, }}
                transition={{ duration: .5, delay: 0, }}
            >
                <div className='absolute w-[99.5vw] h-[33vh] lg:h-[18vw] lg:w-[25vw] hover:bg-[black] hover:bg-opacity-40'>

                </div>
                <img className=' overflow-hidden w-[99.5vw] h-[35vh] lg:h-[20vw] lg:w-[25vw] border-[.1px] border-[grey]  '
                    src={img} alt="" />
            </motion.div>


        </div>
    )
}
const Tiles = () => {
    return (
        <div className='w-[99.5vw] overflow-hidden'>
            <motion.div
                className=' lg:grid grid-cols-4'

                initial={{ y: 50, }}
                whileInView={{ y: 0, }}
                transition={{ duration: .2, delay: 0, }}
            >

                {
                    posts.map(post => <Tile key={post.id} img={post.img} text={post.text}></Tile>)
                }
            </motion.div>


        </div>
    )
}

export default Tiles
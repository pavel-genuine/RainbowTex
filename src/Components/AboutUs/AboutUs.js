
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
      return (
        <div className='min-h-screen bg-[#181818] text-white pt-20'>
            
            <div className='divide-y pt-10 md:px-20 px-10 space-y-10 '>
            <h1 className='text-4xl font-bold '>About Us</h1>

                <p className='pt-5 text-justify'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum maxime placeat fugit repellendus facilis dolores! Soluta sit necessitatibus numquam veritatis, atque quis, possimus quos dolore mollitia sed repellendus libero accusamus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus asperiores inventore esse, debitis laboriosam omnis similique quo aut ullam dolore magnam unde possimus id perspiciatis velit. Illum ipsum quas doloremque?<br /><br />  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repudiandae voluptate, soluta totam odio earum aperiam saepe aliquid dolores deleniti minus quidem modi commodi! Illo voluptatum adipisci ex quasi reiciendis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nisi sed voluptatum quidem culpa doloribus cumque eveniet vel repudiandae soluta expedita sint illum magnam, distinctio molestiae necessitatibus blanditiis! Culpa, eligendi.
                </p>
                <button className='btn bg-[brown]'>
                    Learn More About What We Do...
                </button>

                <div className='text-justify md:grid grid-cols-3 gap-10 py-10 space-y-4 md:space-y-0'>
                    <div>
                        <h1 className='text-3xl mb-4'>
                            Our Vision
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nam laudantium dolor quasi dignissimos beatae quaerat.
                        </p>
                    </div>
                    <div>
                        <h1 className='text-3xl mb-4'>
                            Our Focus
                        </h1>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nam laudantium dolor quasi dignissimos beatae quaerat.                        </p>
                    </div>
                    <div>
                        <h1 className='text-3xl mb-4'>
                            Our Values
                        </h1>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nam laudantium dolor quasi dignissimos beatae quaerat.                        </p>
                    </div>
                </div>



            </div>

            <Footer></Footer>

        </div>
    )
}

export default AboutUs
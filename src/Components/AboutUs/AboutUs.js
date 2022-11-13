
import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <div className='min-h-screen bg-black text-white'>
            <div className='bg-black h-[60px]'>
                <div className=' flex justify-center items-center py-2'>
                    <h1><Link to={``}> <span className='text-[brown] text-3xl font-bold'> Brandname</span></Link>  <Link to={``}><span className='text-white text-xl font-semibold hover:underline'> | Help Center</span></Link></h1>
                </div>
            </div>
            <div className='divide-y py-10 px-20 space-y-10 '>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum maxime placeat fugit repellendus facilis dolores! Soluta sit necessitatibus numquam veritatis, atque quis, possimus quos dolore mollitia sed repellendus libero accusamus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus asperiores inventore esse, debitis laboriosam omnis similique quo aut ullam dolore magnam unde possimus id perspiciatis velit. Illum ipsum quas doloremque?<br /><br />  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repudiandae voluptate, soluta totam odio earum aperiam saepe aliquid dolores deleniti minus quidem modi commodi! Illo voluptatum adipisci ex quasi reiciendis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore nisi sed voluptatum quidem culpa doloribus cumque eveniet vel repudiandae soluta expedita sint illum magnam, distinctio molestiae necessitatibus blanditiis! Culpa, eligendi.
                </p>
                <button className='btn bg-[brown]'>
                    Learn More About What We Do...
                </button>

                <div className='md:grid grid-cols-3 gap-10 py-10 space-y-4'>
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

            <div className='bg-black h-[200px]'>
                <div className=' flex justify-center items-center py-2'>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-[grey] pt-5">
                        <Link to={``}><p className="hover:underline">Terms of Use</p></Link>
                        <Link to={``}><p className="hover:underline">Privacy</p></Link>
                        <Link to={``}><p className="hover:underline">Cookie Preferences</p></Link>
                        <Link to={``}><p className="hover:underline">Corporate Information</p></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs
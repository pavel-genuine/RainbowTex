
import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

const ContactUs = () => {
    return (
      <div className='min-h-screen pt-16 bg-black text-white'>
          
        <div className='divide-y pt-10 px-20 space-y-10'>
            
            <h1 className='text-4xl font-bold'>Contact Customer Service</h1>
            <div className='space-y-2 pt-5'>
                <h3 className='text-2xl font-bold'>Call us from our app</h3>
                <p>
                    Contacting us is now easier than ever when you contact us from the our app on your Android or iOS phone or tablet! Calling through the app is free - all you need is an internet or cellular connection.
                </p>
            </div>
            <div className='space-y-2 pt-3'>
                <h3 className='text-2xl font-bold'>Email us</h3>
                <p>
                    You will need an internet or mobile phone connection.
                </p>
                <button className='btn '>
                    Email now
                </button>
            </div>
            <div className='space-y-2 pt-3'>
                <h3 className='text-2xl font-bold'>Live Chat</h3>
                <p>
                    You will need an internet or mobile phone connection.
                </p>
                <button className='btn'>
                    Start Live Chat
                </button>
            </div>

        </div>

    <Footer></Footer>

      </div>
    )
}

export default ContactUs
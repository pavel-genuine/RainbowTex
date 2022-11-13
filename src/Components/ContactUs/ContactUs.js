
import React from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => {
    return (
      <div className='min-h-screen'>
          <div className='bg-black h-[60px]'>
                <div className=' flex justify-center items-center py-2'>
                <h1><Link href={``}> <span className='text-[brown] text-3xl font-bold'> Brandname</span></Link>  <Link href={``}><span className='text-white text-xl font-semibold hover:underline'> | Help Center</span></Link></h1>
                </div>
            </div>
        <div className='divide-y py-10 px-20 space-y-10'>
            
            <h1 className='text-4xl font-bold'>Contact Customer Service</h1>
            <div className='space-y-2 pt-5'>
                <h3 className='text-2xl font-bold'>Call us from our app</h3>
                <p>
                    Contacting us is now easier than ever when you contact us from the our app on your Android or iOS phone or tablet! Calling through the app is free - all you need is an internet or cellular connection.
                </p>
            </div>

            <div className='space-y-2 pt-3'>
                <h3 className='text-2xl font-bold'>Call us from any phone</h3>
                <p>
                    Call us using the Netflix app as we don't offer a phone number in your country
                </p>
                <button className='btn btn-outline'>
                    Call us
                </button>
            </div>

            <div className='space-y-2 pt-3'>
                <h3 className='text-2xl font-bold'>Email us</h3>
                <p>
                    You will need an internet or mobile phone connection.
                </p>
                <button className='btn btn-outline'>
                    Email now
                </button>
            </div>
            <div className='space-y-2 pt-3'>
                <h3 className='text-2xl font-bold'>Live Chat</h3>
                <p>
                    You will need an internet or mobile phone connection.
                </p>
                <button className='btn btn-outline'>
                    Start Live Chat
                </button>
            </div>

        </div>

        <div className='bg-black h-[200px]'>
                <div className=' flex justify-center items-center py-2'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-[grey] pt-5">
                    <Link href={``}><p className="hover:underline">Terms of Use</p></Link>
                    <Link href={``}><p className="hover:underline">Privacy</p></Link>
                    <Link href={``}><p className="hover:underline">Cookie Preferences</p></Link>
                    <Link href={``}><p className="hover:underline">Corporate Information</p></Link>
                </div>
                </div>
            </div>

      </div>
    )
}

export default ContactUs
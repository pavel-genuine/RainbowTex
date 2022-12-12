import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-[#181818] bg-opacity-90 md:w-[90vw] w-[95vw] pt-20 h-[30%] mx-auto  py-10 text-[grey] ">
    <div className="md:w-[80vw] w-[95vw] pl-10 mx-auto border-t border-slate-800 py-10">
    <Link to={`/contact-us`}><span className="text-lg hover:underline">Questions? Contact us.</span></Link>
     <div className="grid md:grid-cols-3 grid-cols-2 mt-5 gap-10 md:gap-4">
         <Link to={`/about-us`}><p className="hover:underline">About Us</p></Link>
         <Link to={`/contact-us`}><p className="hover:underline">FAQ</p></Link>
         <Link to={`/about-us`}><p className="hover:underline">Terms of Use</p></Link>
         <Link to={`/about-us`}><p className="hover:underline">Privacy</p></Link>
         <Link to={`/about-us`}><p className="hover:underline">Cookie Preferences</p></Link>
         <Link to={`/about-us`}><p className="hover:underline">Corporate Information</p></Link>
     </div>
    </div>
 </div>
  )
}

export default Footer
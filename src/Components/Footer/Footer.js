import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-[#181818] bg-opacity-90 w-[100%] mt-20 h-[30%]  py-10 text-[grey] border-t border-slate-800">
    <div className="w-[80%] mx-auto">
    <Link to={`/`}><span className="text-lg hover:underline">Questions? Contact us.</span></Link>
     <div className="grid grid-cols-3 mt-5">
         <Link to={``}><p className="hover:underline">FAQ</p></Link>
         <Link to={``}><p className="hover:underline">Help Center</p></Link>
         <Link to={``}><p className="hover:underline">Terms of Use</p></Link>
         <Link to={``}><p className="hover:underline">Privacy</p></Link>
         <Link to={``}><p className="hover:underline">Cookie Preferences</p></Link>
         <Link to={``}><p className="hover:underline">Corporate Information</p></Link>
     </div>
    </div>
 </div>
  )
}

export default Footer
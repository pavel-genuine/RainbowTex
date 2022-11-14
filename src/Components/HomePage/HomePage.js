import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Banner from './Banner'
import Categories from './Categories'

const HomePage = () => {

  const [updatedBanner, setUpdatedBanner] = useState({})

  const handleBanner=(data)=>{
    setUpdatedBanner(data)
  }
// 
  console.log(updatedBanner,'banner');

  return (
    <div className='bg-black'>
        <Banner updatedBanner={updatedBanner} ></Banner>
        <Categories handleBanner={handleBanner}></Categories>
        <Footer></Footer>
    </div>
  )
}

export default HomePage
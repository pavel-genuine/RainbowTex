import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Banner from './Banner'
import Categories from './Categories'

const HomePage = () => {

  const [updatedBanner, setUpdatedBanner] = useState({})
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBanner=(data)=>{
    setUpdatedBanner(data)
  }
// 
  console.log(updatedBanner,'banner');

  return (
    <div className='bg-[#181818] pt-'>
        <Banner updatedBanner={updatedBanner} ></Banner>
        <Categories handleBanner={handleBanner}></Categories>
        <Footer></Footer>
    </div>
  )
}

export default HomePage
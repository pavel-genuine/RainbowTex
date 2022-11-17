import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Banner from './Banner'
import Categories from '../Categories/Categories'
import Slick from './Slick'

const HomePage = () => {

  const [updatedBanner, setUpdatedBanner] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBanner = (data) => {
    setUpdatedBanner(data)
  }
  // 
  console.log(updatedBanner, 'banner');

  return (
    <div>
      <div className='bg-[#181818] pt-16 md:pt-0 box-border'>

        <div>
          <Banner updatedBanner={updatedBanner} ></Banner>
        </div>

        <div className=''>
          <Categories handleBanner={handleBanner}></Categories>
        </div>

        <Footer></Footer>
      </div>
    
    </div>
  )
}

export default HomePage
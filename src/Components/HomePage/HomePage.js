import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import Banner from './Banner'
import Categories from '../Categories/Categories'

const HomePage = ({filteredCategory}) => {



  useEffect(() => {
    window.scrollTo(0, 0)


  }, [])

  return (
    <div>
      <div className='bg-[#181818] pt-16 md:pt-0 box-border min-h-[100vh]'>

        <div>
          <Banner></Banner>
        </div>

        <div className='mt-20'>
          <Categories filteredCategory={filteredCategory}></Categories>
        </div>

        <Footer></Footer>
      </div>
    
    </div>
  )
}

export default HomePage
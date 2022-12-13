import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeCategories from './HomeCategories';


const Categories = ({  filteredCategory}) => {



  return (
    <div className='md:mx-1 mx-auto mt-10 z-10 '>
      
      <HomeCategories  filteredCategory={filteredCategory}></HomeCategories>
    </div>
  )
}

export default Categories
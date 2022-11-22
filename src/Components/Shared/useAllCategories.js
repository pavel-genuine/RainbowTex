import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  allCategoriesGet } from '../../redux/features/categorySlice'
import { allfeaturedGet } from '../../redux/features/featuredPost/featuredPostSlice'

const useAllCategories = () => {

    const {error, category, isLoading} =useSelector(state=>state?.allCategories)

    const dispatch =useDispatch()
  
    // console.log(featured, 'banner feat');

    useEffect(() => {
        dispatch(allCategoriesGet())
        // console.log('featured', category);
        // console.log('error', error);
    }, [])


  return (
     {error, category, isLoading}
  )
}

export default useAllCategories;
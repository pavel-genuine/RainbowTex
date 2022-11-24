import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  allCategoriesGet } from '../../redux/features/categorySlice'

const useAllCategories = () => {

    const {error, category, isLoading} =useSelector(state=>state?.allCategories)

    const dispatch =useDispatch()
  
    // console.log('all cates array', category?.categories);
    
    useEffect(() => {
        dispatch(allCategoriesGet())        
    }, [])


  return (
     {error, category, isLoading}
  )
}

export default useAllCategories;
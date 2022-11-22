import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allfeaturedGet } from '../../redux/features/featuredPost/featuredPostSlice'

const useAllFeatured = () => {

    const {error, featured, isLoading} =useSelector(state=>state?.allFeatured)

    const dispatch =useDispatch()
  
    // console.log(featured, 'banner feat');

    useEffect(() => {
        dispatch(allfeaturedGet())
        console.log('featured', featured);
        console.log('error', error);
    }, [])


  return (
     {error, featured, isLoading}
  )
}

export default useAllFeatured;
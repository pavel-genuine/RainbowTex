import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allfeaturedGet } from '../../redux/features/featuredPost/featuredPostSlice'

const useAllFeatured = () => {

    const {error, featured, isLoading} =useSelector(state=>state?.allFeatured)

    const dispatch =useDispatch()
  
   

    useEffect(() => {
        dispatch(allfeaturedGet())

    }, [])

    //  console.log(featured, 'banner feat');

   


  return (
     {error, featured, isLoading}
  )
}

export default useAllFeatured;
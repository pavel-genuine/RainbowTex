import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeCategories } from '../../../redux/features/categorySection/homeCategories'

const useHomeCategories = (limit) => {

    const {error, category, isLoading} =useSelector(state=>state?.homeCategories)
    

    const dispatch =useDispatch()

    useEffect(() => {
        dispatch(getHomeCategories())
    }, [])


  return (
    {error, category, isLoading}
  )
}

export default useHomeCategories;
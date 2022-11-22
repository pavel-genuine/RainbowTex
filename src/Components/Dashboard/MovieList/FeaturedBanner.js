import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeatured } from '../../../redux/features/featuredPost/featuredPostSlice'
import useAllFeatured from '../../Shared/useAllFeatured'

const FeaturedBanner = ({movie}) => {

    const [isBanner, setIsBanner] = useState(false)

    const { featured } = useSelector(state => state?.addFeatured)
    const dispatch = useDispatch()
   

    const {featured:allFeatured} =useAllFeatured()

    const newFeatured = allFeatured?.find(item => item?.postId == movie?._id);
    // console.log(allFeatured,'feat all');
    // console.log(newFeatured,'new feat');

    const addBanner = (data) => {
        dispatch(addFeatured(data))
    }

  return (
    <div>  {
        isBanner || newFeatured ? 
        <input type="checkbox" class="toggle toggle-error " checked /> 
        : <input
            onClick={() => {
                addBanner({
                    videoCover: {
                        key: movie?.videoCover?.key,
                        cdnUrl: movie?.videoCover?.cdnUrl,
                        s3Url: movie?.videoCover?.s3Url,
                    },
                    postId: movie?._id,
                    title: movie?.title,
                    description: movie?.description,
                    imdbRating: movie?.imdbRating
                });
                setIsBanner(true);
            }}
            type="checkbox" class="toggle toggle-error " />

    }</div>
  )
}

export default FeaturedBanner
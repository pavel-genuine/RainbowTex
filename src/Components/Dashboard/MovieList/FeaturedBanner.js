import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeatured } from '../../../redux/features/featuredPost/featuredPostSlice'
import useAllFeatured from '../../Shared/useAllFeatured'

const FeaturedBanner = ({movie}) => {

    const [isBanner, setIsBanner] = useState(false)
    const { featured:addedFeature } = useSelector(state => state?.featuredAdd)
    const dispatch = useDispatch()
   
    const  {error, featured, isLoading} =useAllFeatured()

    const addBanner = (data) => {
        dispatch(addFeatured(data))
    }

  return (
    <div> 

{
    featured?.length ? 
    <div>
         {
        isBanner || featured?.find(item => item?.postId == movie?._id)
        ? 
        <input type="checkbox" class="toggle toggle-error " checked /> 
        :
         <input
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
            type="checkbox" class="toggle " />

    }
    </div>
    :
    <input type="checkbox" class="toggle  "/>

}

    </div>
  )
}

export default FeaturedBanner
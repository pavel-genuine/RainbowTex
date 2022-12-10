import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createfeatured, removeFeatured } from '../../../api/api'
import { addFeatured } from '../../../redux/features/featuredPost/featuredPostSlice'
import useAllFeatured from '../../Shared/useAllFeatured'

const FeaturedBanner = ({ movie }) => {

    const [isBanner, setIsBanner] = useState(true)
    const { featured: addedFeature } = useSelector(state => state?.featuredAdd)
    // const { featured: removeFeat } = useSelector(state => state?.removeFeature)
    const dispatch = useDispatch()

    const { error, featured, isLoading } = useAllFeatured()

    const addBanner = async (data) => {
        await createfeatured(data)
    }
    const removeBanner = async (data) => {
        data = {
            postId: movie?._id
        }
        await removeFeatured(data)
        setIsBanner(() => false)

        
    }
    // console.log(featured, 'bbb');

    return (
        <div>

            {
                featured?.length ?
                    <div>
                        {
                            isBanner
                                ?
                                <div>
                                    {featured?.find(item => item?.postId == movie?._id) ?

                                        <input onClick={removeBanner} type="checkbox" class={`toggle toggle-error`} checked />
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
                    <input onClick={removeBanner} type="checkbox" class="toggle  " />

            }

        </div>
    )
}

export default FeaturedBanner
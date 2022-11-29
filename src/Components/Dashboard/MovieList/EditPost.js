import React, { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SideBar from '../SideBar';
import VideoUploader from '../PublishPost/VideoUploader';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost, singlePostGet } from '../../../redux/features/postSection/postSlice';
import { videoCoverAdd } from '../../../redux/features/postSection/videoCoverSlice';
import { createPost } from '../../../api/api';
import useAllCategories from '../../Shared/useAllCategories';
import { categoryAdd } from '../../../redux/features/postSection/postCategorySlice';
import { useParams } from 'react-router-dom';


const EditPost = () => {


    const { id } = useParams()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { isLoading, error, post: movie } = useSelector(state => state?.singlePost);

    const [selectedCate, setSelectedCate] = useState()

    const { category } = useAllCategories()

    const [postData, setPostData] = useState({
        videocover: null,
        thumbnail: null
    });

    const [videocover, setVideocover] = useState()

    const [coverPhoto, setCoverPhoto] = useState();
    const [thumbnail, setThumbnail] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(singlePostGet(id))
    }
        , [])




    const onChangeCover = (data) => {
        setCoverPhoto(data)
        const image = data[0].file
        setPostData((items) => ({ ...items, videocover: image }));
    }

    const onChangeThumbnail = (data) => {
        const image = data[0].file
        setThumbnail(data)
        setPostData((items) => ({ ...items, thumbnail: image }));
    }

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        formData.append('category', selectedCate);
        // formData.append('tags', []);
        // formData.append('premium', data?.false);
        console.log('fdata cover file', coverPhoto);
        formData.append('videocover', postData?.videocover);
        formData.append('thumbnail', postData?.thumbnail);
        // formData.append('imdbRating', data?.rating);
        // formData.append('trailerUrl', '');


        // formData.append('genre', data?.genre);
        // formData.append('isActive',data?.active);

        // formData.append('videos[0][url]', video?.url);
        // formData.append('videos[0][key]', video?.key);


        const submit = dispatch(publishPost(formData))

        toast.success("Congratulation! Post Published")
    }

    if (isLoading) {
        <p>loading...</p>
    }

    return (
        <div className='bg-[#181818] text-slate-200 pt-[18.5%] md:pt-0   '>
            <Toaster></Toaster>
            <div className='md:hidden'>
                <SideBar index={4} color={'[#e50914]'} className=''></SideBar>
            </div>
            <div className='mx-auto pt-[16.7%] md:pt-0  md:w-[100%] w-[90%] mx-auto  md:grid grid-cols-12 '>
                <div className='md:block hidden'>
                    <SideBar index={4} color={'[#e50914]'} className=''></SideBar>
                </div>

                <div className='col-span-10  pb-10 mx-auto  md: md:pt-32 '>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl font-bold ">Update information</h2>
                        <div className="flex justify-between">
                            <h1 className="text-[brown] font-semibold"></h1>
                            {/* { */}
                            {/* videoUrl ?  */}
                            <button type="submit" className=" btn hover:bg-[#e50914] bg-[brown] btn-xs mb-10 ">
                                Publish
                            </button>
                            {/* :
                         <button disabled type="submit" className="disabled:btn-error  disabled:btn-xs ">
                         Publish
                     </button> */}

                            {/* } */}
                        </div>
                        <div>



                            <div className='flex flex-col'>
                                <div className='md:flex items-center '>
                                    <div className='mr-5'>
                                        <div style={{
                                            zIndex: '0', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                            backgroundImage: `url(${movie?.videoCover?.cdnUrl && movie?.videoCover?.cdnUrl})`
                                        }} class='bg-cover absolute border-slate-600 border border-b-0 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  md:mx-auto shadow overflow-hidden sm:rounded-t-lg' >

                                            <div class="px-4 py-5 sm:px-6 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]" >

                                            </div>
                                        </div>
                                        <ImageUploading
                                            value={coverPhoto}
                                            onChange={onChangeCover}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload
                                            }) => (


                                                <div className="upload__image-wrapper relative text-black">

                                                    <div class="mt-1 flex justify-center mb-8 mr-2 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  border-dashed rounded-md">
                                                        <div class="space-y-1 text-center">
                                                            <div class="flex text-sm text-gray-600">
                                                                <label onClick={onImageUpload} for="file-upload1" class="relative cursor-pointer rounded-md font-medium text-white bg-black p-2 bg-opacity-50 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                    <svg class="mx-auto h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg><span>Upload Video Cover</span>
                                                                    <input style={{ backgroundColor: ' #919cb1', border: '#6b7280' }} class="sr-only" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        imageList?.map((image, index) => (

                                                            <div style={{
                                                                zIndex: '1', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                                                backgroundImage: `url(${image?.data_url})`
                                                            }}
                                                                class='bg-cover border-slate-600 border  md:w-[18vw] w-[90vw] h-[185px]  md:h-[205px]  md:mx-auto absolute top-[-2%] left-[0%]  shadow overflow-hidden rounded-lg' >

                                                                <div class="px-4 py-5 sm:px-6 mr-2 " >

                                                                    <p title='Change cover' onClick={onImageUpload} className='absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg></p>

                                                                </div>
                                                            </div>))
                                                    }

                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>

                                    <div>
                                        <div style={{
                                            zIndex: '0', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                            backgroundImage: `url(${movie?.thumbnail?.cdnUrl && movie?.thumbnail?.cdnUrl})`
                                        }} class='bg-cover absolute border-slate-600 border border-b-0 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  md:mx-auto shadow overflow-hidden sm:rounded-t-lg' >

                                            <div class="px-4 py-5 sm:px-6 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]" >

                                            </div>
                                        </div>
                                        <ImageUploading
                                            value={thumbnail}
                                            onChange={onChangeThumbnail}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload
                                            }) => (


                                                <div className="upload__image-wrapper relative">

                                                    <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  border-dashed rounded-md">
                                                        <div class="space-y-1 text-center">
                                                            <div class="flex text-sm text-gray-600">
                                                                <label onClick={onImageUpload} for="file-upload2" class="relative cursor-pointer rounded-md font-medium text-white bg-black p-2 bg-opacity-50 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                    <svg class="mx-auto h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg><span>Upload Thumbnail</span>
                                                                    <input style={{ backgroundColor: ' #919cb1', border: '#6b7280' }} class="sr-only" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        imageList?.map((image, index) => (

                                                            <div style={{
                                                                zIndex: '1', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                                                backgroundImage: `url(${image?.data_url})`
                                                            }}
                                                                class='bg-cover border-slate-600 border  md:w-[18vw] w-[90vw] h-[180px] md:h-[205px]  md:mx-auto absolute top-[-2%] left-[0%]  shadow overflow-hidden rounded-lg' >

                                                                <div class="px-4 py-5 sm:px-6  " >

                                                                    <p title='Change thumbnail' onClick={onImageUpload} className='absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg></p>

                                                                </div>
                                                            </div>))
                                                    }

                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                    <div className='mb-7 md:ml-5'>
                                        <VideoUploader videoUrl={movie?.video?.url} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='md:grid grid-cols-3'>
                                    <div className='grow-wrap mr-10 col-span-2'>
                                        {

                                            <div>
                                                <textarea
                                                    style={{ fontWeight: 'bolder', fontSize: '20px' }}
                                                    placeholder='Title'
                                                    defaultValue={movie?.title}
                                                    // readOnly={false}
                                                    className='shadow-sm bg-[#181818]  border-b-2 text-2xl font-blod focus:outline-none  block w-full sm:text-md'
                                                    name="" id="" cols="30" rows="1"
                                                    {...register("title", {
                                                        required: {
                                                            value: true,
                                                            message: 'Title is required'
                                                        }
                                                    })}>
                                                </textarea>
                                                <label className="label">
                                                    {errors?.title?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.title.message}</span>}

                                                </label>
                                            </div>
                                        }
                                    </div>

                                    <div className="form-control w-full max-w-xs text-white mt-5 ">
                                        <select onChange={(e) => { setSelectedCate(e.target.value) }} className="select select-bordered bg-slate-400">


                                            <option selected>{movie?.categoryName}</option>
                                            {
                                                category?.categories?.length > 0 &&
                                                category?.categories?.map(item => {
                                                    return <option value={item?._id}>{item?.categoryName}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className='flex '>
                                    <div className='grow-wrap'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='Release Date'
                                            defaultValue={movie?.release}
                                            className='shadow-sm bg-[#181818]   border-b-2 md:text-lg font-blod focus:outline-none mt-10 px-2 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("release")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap md:mx-10 mx-2'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='Duration'
                                            defaultValue={movie?.duration}
                                            className='shadow-sm bg-[#181818]   border-b-2 md:text-lg font-blod focus:outline-none mt-10 px-2 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("duration")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='IMDb Rating'
                                            defaultValue={movie?.imdbRating}
                                            className='shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none mt-10 px-2 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("rating")}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className='grow-wrap'>
                                    <textarea
                                        style={{ fontWeight: 'bold', fontSize: '15px' }}
                                        placeholder="Description..."
                                        defaultValue={movie?.description}
                                        id="blog" name="blog" rows="4"
                                        className=" shadow-sm bg-[#181818] border-b-2 focus:outline-none mt-20 pt-12 text-lg mt-1 block w-full  px-2 "
                                        {...register("description")}>


                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default EditPost
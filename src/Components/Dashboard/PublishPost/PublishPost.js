import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SideBar from '../SideBar';
import VideoUploader from './VideoUploader';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost } from '../../../redux/features/postSection/postSlice';
import { videoCoverAdd } from '../../../redux/features/postSection/videoCoverSlice';
import { createPost } from '../../../api/api';
import useAllCategories from '../../Shared/useAllCategories';
import { categoryAdd } from '../../../redux/features/postSection/postCategorySlice';


const PublishPost = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [selectedCate, setSelectedCate] = useState()

    const { category } = useAllCategories()

    const [postData, setPostData] = useState({
        videocover: null,
        thumbnail :null
    });

    const [videocover, setVideocover] = useState()

    const [coverPhoto, setCoverPhoto] = useState();
    const [thumbnail, setThumbnail] = useState('')

    const { video } = useSelector(state => state?.postVideo)
    const { isLoading, error, post } = useSelector(state => state?.publishPost)
    const { postCategory } = useSelector(state => state?.addPostCategory)
    

    console.log('post video', video);
    const dispatch = useDispatch()

    const handleSetCate = () => {
        const cate = {
            postId: post?._id,
            categoryId: selectedCate
        }
        console.log('set selected cate', selectedCate, post?._id);
        // dispatch(categoryAdd(cate))

        console.log('post cate', postCategory);
    }

    const onChangeCover = (data) => {
        setCoverPhoto(data)
        const image = data[0].file
        setPostData((items) => ({...items, videocover: image }));
    }

    const onChangeThumbnail = (data) => {
        const image = data[0].file
        setThumbnail(data)
        setPostData((items) => ({...items, thumbnail: image }));
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

        formData.append('videos[0][url]', video?.url);
        formData.append('videos[0][key]', video?.key);


        const submit = dispatch(publishPost(formData))

        console.log('post', post);

        toast.success("Congratulation! Post Published")
    }
    const email = ''
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
                        <h2 className="text-2xl font-bold ">Upload Your Movie</h2>
                        <div className="flex justify-between my-10 ">
                            <h1 className="text-[brown] font-semibold">{email}</h1>
                            {/* { */}
                            {/* videoUrl ?  */}
                            <button type="submit" className=" btn hover:bg-[#e50914] bg-[brown] btn-xs ">
                                Publish
                            </button>
                            {/* :
                         <button disabled type="submit" className="disabled:btn-error  disabled:btn-xs ">
                         Publish
                     </button> */}

                            {/* } */}
                        </div>
                        <div className=''>



                        <div className='flex flex-col'>
                                <div className='md:flex  '>
                                    <div className='mr-10'>
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

                                                <div class="mt-1 flex justify-center mb-8 mr-2 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[20vw] h-[80px] md:h-[200px]  border-dashed rounded-md">
                                                    <div class="space-y-1 text-center">
                                                        <div class="flex text-sm text-gray-600">
                                                            <label onClick={onImageUpload} for="file-upload1" class="relative cursor-pointer rounded-md font-medium hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
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
                                                            class='bg-cover border-slate-600 border  md:w-[18vw] w-[20vw] h-[80px] md:h-[205px]  md:mx-auto absolute top-[0%] left-[0%]  shadow overflow-hidden rounded-lg' >

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

                                                <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[20vw] h-[80px] md:h-[200px]  border-dashed rounded-md">
                                                    <div class="space-y-1 text-center">
                                                        <div class="flex text-sm text-gray-600">
                                                            <label onClick={onImageUpload} for="file-upload2" class="relative cursor-pointer rounded-md font-medium hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
                                                            class='bg-cover border-slate-600 border  md:w-[18vw] w-[20vw] h-[80px] md:h-[205px]  md:mx-auto absolute top-[0%] left-[0%]  shadow overflow-hidden rounded-lg' >

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
                                </div>


                                <div className='rounded-lg'>
                                    <div className='h-[68%]'>
                                        <VideoUploader width={420} height={280} />

                                    </div>
                                    <div>
                                        <div className="form-control w-full max-w-xs text-white ">
                                            <select onChange={(e) => { setSelectedCate(e.target.value) }} className="select select-bordered bg-slate-400">


                                                <option disabled selected>Select Category</option>
                                                {
                                                    category?.categories?.length > 0 &&
                                                    category?.categories?.map(item => {
                                                        return <option value={item?._id}>{item?.categoryName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='grow-wrap'>
                                    <textarea
                                        style={{ fontWeight: 'bolder', fontSize: '20px' }}
                                        placeholder='Movie Title'
                                        className='shadow-sm bg-[#181818] border-b-2 text-2xl font-blod focus:outline-none mt-8   block w-full sm:text-md'
                                        name="" id="" cols="30" rows="1"
                                        {...register("title")}>
                                    </textarea>
                                </div>

                                <div className='flex '>
                                    <div className='grow-wrap'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='Release Date'
                                            className='shadow-sm bg-[#181818] border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 mt-1 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("release")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap md:mx-10 mx-2'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='Duration'
                                            className='shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 mt-1 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("duration")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap'>
                                        <textarea
                                            style={{ fontWeight: 'bold', fontSize: '15px' }}
                                            placeholder='IMDb Rating'
                                            className='shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="1"
                                            {...register("rating")}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className='grow-wrap'>
                                    <textarea
                                        style={{ fontWeight: 'bold', fontSize: '15px' }}
                                        placeholder="Description..."
                                        id="blog" name="blog" rows="4"
                                        className="bg-[#181818] shadow-sm border-b-2 focus:outline-none mt-20 pt-12 text-lg mt-1 block w-full  px-2 "
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

export default PublishPost;
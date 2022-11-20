import React from 'react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SideBar from '../SideBar';
import VideoUploader from './VideoUploader';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../api/api';

const PublishPost = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const user = 'xyz'
    const profile = 'xyz'

    
    const { isLoading, error, post } = useSelector(state => state?.publishPost)

    const dispatch = useDispatch()

 
    const [coverPhoto, setCoverPhoto] = useState([]);

    const onChangeCover = (data) => {

        setCoverPhoto(data)
        const image = data[0].file
        console.log('cover', coverPhoto);
        console.log('onchange-img', image);

    }

    const onSubmit = async (data) => {

        console.log(data,'post data');

        const submit = dispatch(createPost(data))
        console.log(submit,'post');
        return submit; 
        // const image = coverPhoto[0]?.file

        // console.log('img', image);

        // console.log('dis', data);


        // const formData = new FormData()
        // formData.append("file", image)
        // formData.append("upload_preset", "ch77jcb5")
        // formData.append("cloud_name", "pavel-genuine")
        // const url = `https://api.cloudinary.com/v1_1/pavel-genuine/image/upload`
        // fetch(url,
        //     {
        //         method: "POST",
        //         body: formData

        //     })
        //     .then(res => res.json())
        //     .then(async result => {
        //         console.log('imgbbCover', result)
        //         const banner = result.url
        //         const sendData = { blogger: user?.displayName, banner, title: data.title, body: data.body, profilePhoto: profile?.profilePhoto }
        //         console.log('sendData', sendData);

        //         await fetch(`http://localhost:5000/blogs`,
        //             {
        //                 method: 'POST',
        //                 headers: {
        //                     'content-type': 'application/json',
        //                 },
        //                 body: JSON.stringify(sendData)
        //             })

        //     })

        // toast.success("Congratulation! Post Published")
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
                            <h1 className="text-[brown] font-semibold">{user?.email}</h1>
                            <button type="submit" className=" btn hover:bg-[#e50914] bg-[brown] btn-xs ">
                                Publish
                            </button>
                        </div>
                        <div className=''>



                            <div className='flex'>
                                <ImageUploading
                                    value={coverPhoto}
                                    onChange={onChangeCover}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload
                                    }) => (


                                        <div className="upload__image-wrapper relative">

                                            <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6 border-2 md:w-[27vw] w-[40vw] h-[150px] md:h-[270px]  border-dashed rounded-md">
                                                <div class="space-y-1 text-center">
                                                    <div class="flex text-sm text-gray-600">
                                                        <label for="file-upload" class="relative cursor-pointer rounded-md font-medium hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <svg onClick={onImageUpload} class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg><span>Upload Banner</span>
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
                                                        class='bg-cover border-slate-600 border  md:w-[27vw] w-[40vw] h-[155px] md:h-[280px]  md:mx-auto absolute top-[0%] left-[0%]  shadow overflow-hidden rounded-lg' >

                                                        <div class="px-4 py-5 sm:px-6  " >

                                                            <p title='Change blog banner' onClick={onImageUpload} className='absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg></p>

                                                        </div>
                                                    </div>))
                                            }

                                        </div>
                                    )}
                                </ImageUploading>

                                <div className='ml-5 rounded-lg'>
                                    <VideoUploader width={420} height={280} />
                                </div>
                            </div>

                            <div>
                                <div className='grow-wrap'>
                                    <textarea
                                    style={{fontWeight:'bolder', fontSize:'20px'}}
                                        placeholder='Movie Title'
                                        className='shadow-sm bg-[#181818] border-b-2 text-2xl font-blod focus:outline-none mt-8  mt-1 block w-full sm:text-md p-2'
                                        name="" id="" cols="30" rows="2"
                                        {...register("title")}>
                                    </textarea>
                                </div>

                                {/* <div className='flex '>
                                    <div className='grow-wrap'>
                                        <textarea
                                        style={{fontWeight:'bold', fontSize:'15px'}}
                                            placeholder='Release Date'
                                            className='shadow-sm bg-[#181818] border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 mt-1 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" rows="2"
                                            {...register("release")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap md:mx-10 mx-2'>
                                        <textarea
                                        style={{fontWeight:'bold', fontSize:'15px'}}
                                            placeholder='Duration'
                                            className='shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 mt-1 block w-full sm:text-md p-2'
                                            name="" id="" cols="30" 
                                            {...register("duration")}>
                                        </textarea>
                                    </div>

                                    <div className='grow-wrap'>
                                        <textarea
                                        style={{fontWeight:'bold', fontSize:'15px'}}
                                            placeholder='IMDb Rating'
                                            className='shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none mt-20 px-2 block w-full sm:text-md p-2'
                                            name="" id="" cols="30"
                                            {...register("rating")}>
                                        </textarea>
                                    </div>
                                </div> */}
                               
                                <div  className='grow-wrap'>
                                    <textarea 
                                    style={{fontWeight:'bold', fontSize:'15px'}}
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
import React, { useRef, useState } from 'react'
import axios, { CancelToken, isCancel } from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { videoUpload } from '../../../redux/features/postSection/postVideoSlice'

const VideoUploader = (props) => {
    const inputRef = useRef();
    const [source, setSource] = useState();

    const [progress, setProgress] = useState();
    const [erro, setError] = useState();
    const cancelFileUpload = useRef(null);
    
    const { isLoading, error, video } = useSelector(state => state?.postVideo)

    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData()
        formData.append("video", file)
        const url = URL.createObjectURL(file);

        setSource(url);
       
        // dispatch(videoUpload(formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //     onUploadProgress: data => {
        //       //Set the progress value to show the progress bar
        //       setProgress(Math.round((100 * data.loaded) / data.total))
        //     },
        //   })
        //   .catch(error => {
        //     const { code } = error?.response?.data
        //     switch (code) {
        //       case "FILE_MISSING":
        //         setError("Please select a file before uploading!")
        //         break
        //       default:
        //         setError("Sorry! Something went wrong. Please try again later")
        //         break
        //     }
        //   }))

    };

    // console.log(video,'vido');

    const cancelUpload = () => {
        if (cancelFileUpload.current)
            cancelFileUpload.current("User has canceled the file upload.");
    };

    const handleChoose = (event) => {
        //   inputRef.current.click();
    };

    return (
        <div>
            {!progress > 0 &&
                <div>
                    <div className='flex justify-end items-center '>
                    <progress class="progress progress-error mr-2" value={progress} max="100"></progress>
                    {/* <span
                        className="text-[red] cursor-pointer"
                        onClick={() => cancelUpload()}
                    >
                        X
                    </span> */}
                </div>
                <label>{progress}% uploaded</label>
                </div>
                
            }

            <div className="VideoInput relative">
                <input
                    id="file-upload"
                    // ref={inputRef}
                    className="VideoInput_input hidden"
                    type="file"
                    onChange={handleFileChange}
                />

                <div class="flex justify-center  items-center  border-2 px-6 pt-5 pb-6 md:w-[18vw] w-[90vw] h-[270px]  md:h-[200px] order-2 border-dashed rounded-md">


                    <div class="space-y-1 text-center">
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md font-medium hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <svg onChange={handleFileChange} class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg><span>Upload Video</span>
                                <input style={{ backgroundColor: ' #919cb1', border: '#6b7280' }} class="sr-only" />
                            </label>
                        </div>
                    </div>
                </div>
               <div>
               {/* {
                    !video?.url && source &&  <button type="submit" className=" btn hover:bg-[#e50914] bg-[brown] btn-xs">
                   please wait, video uploading...<progress label={`ww`} className="progress w-56 progress-info"></progress>
                </button> 
                } */}
                {source && (

                    <div className='absolute md:top-[-30%] top-[0]'>
                       
                        <video className=' rounded cursor-pointer md:w-[30vw] w-[90vw] h-[270px] md:h-[270px] ' controls poster={props?.poster} controlsList="nodownload">
                            <source src={source} />
                        </video>
                    </div>
                )}
               </div>
            </div>
        </div>
    )
}

export default VideoUploader
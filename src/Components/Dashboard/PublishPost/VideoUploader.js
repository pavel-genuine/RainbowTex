import React, { useRef, useState } from 'react'
import axios, { CancelToken, isCancel } from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { videoUpload } from '../../../redux/features/postSection/postVideoSlice'

const VideoUploader = (props) => {
    const inputRef = useRef();
    const [source, setSource] = useState();
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [progress, setProgress] = useState();
    const cancelFileUpload = useRef(null);
    const { isLoading, error, video } = useSelector(state => state?.postVideo)

    const dispatch = useDispatch()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData()
        formData.append("video", file)
        const url = URL.createObjectURL(file);

        setSource(url);
        const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);

                if (percent < 100) {
                    setUploadPercentage(percent);
                }
            },
            cancelToken: new CancelToken(
                cancel => (cancelFileUpload.current = cancel)
            )
        };

        const sub =dispatch(videoUpload(formData))

        console.log(video,'video');
        console.log(sub,'video sub');

        if (video) {
            setUploadPercentage(100);
            setTimeout(() => {
                setUploadPercentage(0);
            }, 1000);
        }

     
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
            {/* {uploadPercentage > 0 &&
                <div className='flex justify-end items-center mb-5'>
                    <progress class="progress progress-error mr-2" value={uploadPercentage} max="100"></progress>
                    <span
                        className="text-[red] cursor-pointer"
                        onClick={() => cancelUpload()}
                    >
                        X
                    </span>
                </div>
            } */}

            <div className="VideoInput relative">
                <input
                    id="file-upload"
                    // ref={inputRef}
                    className="VideoInput_input hidden"
                    type="file"
                    onChange={handleFileChange}
                />

                <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6  md:w-[27vw] w-[40vw] h-[150px] md:h-[270px] order-2 border-dashed rounded-md">
                    
                    
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
                {source && (
                    
                    <div className='absolute top-[0%] '>
                        {uploadPercentage > 0 &&
                <div className='flex justify-end items-center mb-5'>
                    <progress class="progress progress-error mr-2" value={uploadPercentage} max="100"></progress>
                    <span
                        className="text-[red] cursor-pointer"
                        onClick={() => cancelUpload()}
                    >
                        X
                    </span>
                </div>
            }
                        <video className=' rounded cursor-pointer md:w-[30vw] w-[40vw] h-[170px] md:h-[270px] ' controls poster={props?.poster} controlsList="nodownload">
                            <source src={source} />
                        </video>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoUploader
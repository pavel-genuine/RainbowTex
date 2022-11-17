import React, { useState } from 'react'
import "video-react/dist/video-react.css";

import { BigPlayButton, ControlBar, ForwardControl, Player, ReplayControl } from "video-react"
const VideoUploader = (props) => {

    const inputRef = React.useRef();

    const [source, setSource] = React.useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
    };

    const handleChoose = (event) => {
        //   inputRef.current.click();
    };
    return (
        <div>

            <div className="VideoInput relative">
                <input
                    id="file-upload"
                    // ref={inputRef}
                    className="VideoInput_input hidden"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                />
                <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6 border-2 md:w-[27vw] w-[40vw] h-[150px] md:h-[270px] border-dashed rounded-md">
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
                    <div className='absolute top-[-1%]'>
                        <Player className='rounded-lg'
                            playsInline
                            src={source}
                            fluid={false}
                            width={props?.width}
                            height={props?.height}
                        >
                            <BigPlayButton position="center" />
                            <ControlBar autoHide={false}>
                                <ReplayControl seconds={10} order={2.2} />
                                <ForwardControl seconds={10} order={3.2} />
                            </ControlBar>
                        </Player>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoUploader
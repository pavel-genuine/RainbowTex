import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  removeVideos, uploadVideo} from "../../../api/api";

//
export const videoUpload =createAsyncThunk("/video/videoUpload",
async(video, options)=>{
    const res = await uploadVideo(video,options);
    // console.log('videoUpload thunk',res?.data);
    return res?.data;
})

//remove

// export const removeVideo =createAsyncThunk("/video/removeVideo",
// async(data)=>{
//     const res = await removeVideos(data);
//     console.log('removeVideo thunk',res?.data);
//     return res?.data;
// })

const postVideoSlice = createSlice({
    name:'video',
    initialState:{
        isLoading:false,
        video:[],
        error:null
    },
    extraReducers:(builder) =>{

       //upload
        builder.addCase(videoUpload.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(videoUpload.fulfilled,(state, action)=>{
            state.isLoading= false
            state.video=action.payload
            state.error=null
        });
        builder.addCase(videoUpload.rejected,(state,action)=>{
            state.isLoading= false
            state.video= []
            state.error=action.error.message
        })

        //remove 

        // builder.addCase(removeVideo.pending,(state)=>{
        //     state.isLoading= true
        // });
        // builder.addCase(removeVideo.fulfilled,(state, action)=>{
        //     state.isLoading= false
        //     state.video=action.payload
        //     state.error=null
        // });
        // builder.addCase(removeVideo.rejected,(state,action)=>{
        //     state.isLoading= false
        //     state.video= []
        //     state.error=action.error.message
        // })

        
    }
})

export default postVideoSlice.reducer
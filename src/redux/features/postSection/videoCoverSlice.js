import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  addVideoCoverPhoto, removeVideoCoverPhoto} from "../../../api/api";

//add
export const videoCoverAdd =createAsyncThunk("/videoCover/videoCoverAdd",
async(data)=>{
    const res = await addVideoCoverPhoto(data);
    // console.log('videoCoverAdd thunk',res?.data);
    return res?.data;
})
//remove
export const videoCoverRemove =createAsyncThunk("/videoCover/videoCoverRemove",
async(data)=>{
    const res = await removeVideoCoverPhoto(data);
    // console.log('videoCoverRemove thunk',res?.data);
    return res?.data;
})


const videoCoverSlice = createSlice({
    name:'videoCover',
    initialState:{
        isLoading:false,
        videoCover:[],
        error:null
    },
    extraReducers:(builder) =>{

        //add thumbnail
        builder.addCase(videoCoverAdd.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(videoCoverAdd.fulfilled,(state, action)=>{
            state.isLoading= false
            state.videoCover=action.payload
            state.error=null
        });
        builder.addCase(videoCoverAdd.rejected,(state,action)=>{
            state.isLoading= false
            state.videoCover= []
            state.error=action.error.message
        })

        //remove thumbnail
        builder.addCase(videoCoverRemove.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(videoCoverRemove.fulfilled,(state, action)=>{
            state.isLoading= false
            state.thumbnail=action.payload
            state.error=null
        });
        builder.addCase(videoCoverRemove.rejected,(state,action)=>{
            state.isLoading= false
            state.thumbnail= []
            state.error=action.error.message
        })

        
    }
})

export default videoCoverSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addThumbnail, createPost, deletePost, getAllPosts, getSinglePost, removeThumbnail, uploadVideo } from "../../api/api";

//
export const thumbnailAdd =createAsyncThunk("/thumbnail/thumbnailAdd",
async(data)=>{
    const res = await addThumbnail(data);
    console.log('thumbnailAdd thunk',res?.data);
    return res?.data;
})
//
export const thumbnailRemove =createAsyncThunk("/thumbnail/thumbnailRemove",
async(data)=>{
    const res = await removeThumbnail(data);
    console.log('thumbnailRemove thunk',res?.data);
    return res?.data;
})


const thumbnailSlice = createSlice({
    name:'thumbnail',
    initialState:{
        isLoading:false,
        thumbnail:[],
        error:null
    },
    extraReducers:(builder) =>{

        //add thumbnail
        builder.addCase(thumbnailAdd.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(thumbnailAdd.fulfilled,(state, action)=>{
            state.isLoading= false
            state.thumbnail=action.payload
            state.error=null
        });
        builder.addCase(thumbnailAdd.rejected,(state,action)=>{
            state.isLoading= false
            state.thumbnail= []
            state.error=action.error.message
        })

        //remove thumbnail
        builder.addCase(thumbnailRemove.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(thumbnailRemove.fulfilled,(state, action)=>{
            state.isLoading= false
            state.thumbnail=action.payload
            state.error=null
        });
        builder.addCase(thumbnailRemove.rejected,(state,action)=>{
            state.isLoading= false
            state.thumbnail= []
            state.error=action.error.message
        })

        
    }
})

export default thumbnailSlice.reducer
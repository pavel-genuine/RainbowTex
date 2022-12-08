import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateNonMediaContent } from "../../../api/api";


export const updatePostText =createAsyncThunk("/signIn/fetchUsers",
async(data)=>{
    const res =  await updateNonMediaContent(data)  
    console.log('updatePostText thunk',res?.data);
    return  res?.data
})

const postTextSlice = createSlice({
    name:'postText',
    initialState:{
        isLoading:false,
        postText:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(updatePostText.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(updatePostText.fulfilled,(state, action)=>{
            state.isLoading= false
            state.postText=action.payload
            state.error=null
        });
        builder.addCase(updatePostText.rejected,(state,action)=>{
            state.isLoading= false
            state.postText= []
            state.error=action.error.message
        })

    }
})

export default postTextSlice.reducer
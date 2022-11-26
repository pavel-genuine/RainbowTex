import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addRating, signInUser} from "../../../api/api";

export const ratingAdd =createAsyncThunk("/rating/ratingAdd",
async(data)=>{
    const res =  await addRating(data)  
    console.log('ratingAdd',res?.data);
  
    return  res?.data
})

const signInSlice = createSlice({
    name:'rating',
    initialState:{
        isLoading:false,
        rating:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(ratingAdd.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(ratingAdd.fulfilled,(state, action)=>{
            state.isLoading= false
            state.rating=action.payload
            state.error=null
        });
        builder.addCase(ratingAdd.rejected,(state,action)=>{
            state.isLoading= false
            state.rating= []
            state.error=action.error.message
        })

    }
})

export default signInSlice.reducer
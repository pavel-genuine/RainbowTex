import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { homeCategory } from "../../../api/api";

export const getHomeCategories =createAsyncThunk("/category/getHomeCategories",
async()=>{
    const res = await homeCategory();
    return res?.data;
})

const categorySlice = createSlice({
    name:'category',
    initialState:{
        isLoading:false,
        category:[],
        error:null
    },
    extraReducers:(builder) =>{

        //get home
        builder.addCase(getHomeCategories.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(getHomeCategories.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(getHomeCategories.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })
 
    }
})

export default categorySlice.reducer
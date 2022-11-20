import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPostToCategory, addThumbnail, removeCategoryFromPost, removeThumbnail} from "../../../api/api";

//
export const categoryAdd =createAsyncThunk("/category/categoryAdd",
async(data)=>{
    const res = await addPostToCategory(data);
    console.log('categoryAdd thunk',res?.data);
    return res?.data;
})
//
export const categoryRemove =createAsyncThunk("/category/categoryRemove",
async(data)=>{
    const res = await removeCategoryFromPost(data);
    console.log('categoryRemove thunk',res?.data);
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

        //add thumbnail
        builder.addCase(categoryAdd.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(categoryAdd.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(categoryAdd.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })

        //remove thumbnail
        builder.addCase(categoryRemove.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(categoryRemove.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(categoryRemove.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })

        
    }
})

export default categorySlice.reducer
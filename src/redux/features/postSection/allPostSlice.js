import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../../api/api";


export const fetchAllllPosts =createAsyncThunk("/posts/fetchAllllPosts",
async(page,search)=>{
    const res = await getAllPosts(page,search);

    console.log('AllPosts thunk',res?.data);
    console.log('AllPosts thunk search',search);
    return res?.data;
})

const allPostsSlice = createSlice({
    name:'posts',
    initialState:{
        isLoading:false,
        posts:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(fetchAllllPosts.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchAllllPosts.fulfilled,(state, action)=>{
            state.isLoading= false
            state.posts=action.payload
            state.error=null
        });
        builder.addCase(fetchAllllPosts.rejected,(state,action)=>{
            state.isLoading= false
            state.posts= []
            state.error=action.error.message
        })

    }
})

export default allPostsSlice.reducer
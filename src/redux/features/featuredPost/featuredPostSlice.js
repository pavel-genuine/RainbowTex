import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addThumbnail, createfeatured, getAllFeatured, removeThumbnail} from "../../../api/api";

//
export const addFeatured =createAsyncThunk("/featured/addFeatured",
async(data)=>{
    const res = await createfeatured(data);
    console.log('addFeatured thunk',res?.data);
    return res?.data;
})
//
export const allfeaturedGet =createAsyncThunk("/Featured/allfeaturedGet",
async()=>{
    const res = await getAllFeatured();
    console.log('allfeaturedGet thunk',res?.data);
    return res?.data;
})


const featuredPostSlice = createSlice({
    name:'featured',
    initialState:{
        isLoading:false,
        featured:[],
        error:null
    },
    extraReducers:(builder) =>{

        //add thumbnail
        builder.addCase(addFeatured.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(addFeatured.fulfilled,(state, action)=>{
            state.isLoading= false
            state.featured=action.payload
            state.error=null
        });
        builder.addCase(addFeatured.rejected,(state,action)=>{
            state.isLoading= false
            state.featured= []
            state.error=action.error.message
        })

        //remove thumbnail
        builder.addCase(allfeaturedGet.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(allfeaturedGet.fulfilled,(state, action)=>{
            state.isLoading= false
            state.featured=action.payload
            state.error=null
        });
        builder.addCase(allfeaturedGet.rejected,(state,action)=>{
            state.isLoading= false
            state.featured= []
            state.error=action.error.message
        })

        
    }
})

export default featuredPostSlice.reducer
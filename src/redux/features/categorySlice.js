import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, getAllPosts, getSinglePost} from "../../../api/api";
import { createCategory, getAllCategories, updateCategory} from "../../api/api";

//
export const categoryCreate =createAsyncThunk("/category/categoryCreate",
async(data)=>{
    const res = await createCategory(data);
    console.log('categoryCreate thunk',res?.data);
    return res?.data;
})
//
export const allCategories =createAsyncThunk("/category/allCategories",
async()=>{
    const res = await getAllCategories();
    console.log('allCategories thunk',res?.data);
    return res?.data;
})
//
export const categoryUpdate =createAsyncThunk("/category/categoryUpdate",
async(data)=>{
    const res = await updateCategory(data);
    console.log('categoryUpdate thunk',res?.data);
    return res?.data;
})
//
export const categoryDelete =createAsyncThunk("/category/categoryDelete",
async(data)=>{
    const res = await deletePost(data);
    console.log('deletePost thunk',res?.data);
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

        //post
        builder.addCase(categoryCreate.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(categoryCreate.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(categoryCreate.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })

        //get
        builder.addCase(allCategories.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(allCategories.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(allCategories.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })

        // delete
        builder.addCase(categoryUpdate.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(categoryUpdate.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(categoryUpdate.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })
        // update
        builder.addCase(categoryUpdate.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(categoryUpdate.fulfilled,(state, action)=>{
            state.isLoading= false
            state.category=action.payload
            state.error=null
        });
        builder.addCase(categoryUpdate.rejected,(state,action)=>{
            state.isLoading= false
            state.category= []
            state.error=action.error.message
        })
 
    }
})

export default categorySlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createUser } from "../api/api";

export const fetchUsers =createAsyncThunk("/signUp/fetchUsers",
async(user)=>{
    const res =  await createUser(user)  
    console.log('thunk',res.data);
    return  res.data
})

const signUpSlice = createSlice({
    name:'signUp',
    initialState:{
        isLoading:false,
        signUp:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(fetchUsers.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchUsers.fulfilled,(state, action)=>{
            state.isLoading= false
            state.signUp=action.payload
            state.error=null
        });
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.isLoading= false
            state.signUp= []
            state.error=action.error.message
        })

    }
})

export default signUpSlice.reducer
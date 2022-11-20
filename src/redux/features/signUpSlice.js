import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signUpUser } from "../../api/api";

export const fetchSignUp =createAsyncThunk("/signUp/fetchUsers",
async(user)=>{
    const res =  await signUpUser(user)  
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

        builder.addCase(fetchSignUp.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchSignUp.fulfilled,(state, action)=>{
            state.isLoading= false
            state.signUp=action.payload
            state.error=null
        });
        builder.addCase(fetchSignUp.rejected,(state,action)=>{
            state.isLoading= false
            state.signUp= []
            state.error=action.error.message
        })

    }
})

export default signUpSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signInUser} from "../../../api/api";

export const fetchSignIn =createAsyncThunk("/signIn/fetchUsers",
async(user)=>{
    const res =  await signInUser(user)  
    console.log('signIn thunk',res?.data);
    localStorage.setItem('loginToken',res?.data?.loginToken)
    localStorage.setItem('userId',res?.data?._id)
    localStorage.setItem('email',res?.data?.email)
    if (res?.data?.isAdmin==true) {
        localStorage.setItem('isAdmin',res?.data?.isAdmin)
    }
    return  res?.data
})

const signInSlice = createSlice({
    name:'signIn',
    initialState:{
        isLoading:false,
        signIn:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(fetchSignIn.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchSignIn.fulfilled,(state, action)=>{
            state.isLoading= false
            state.signIn=action.payload
            state.error=null
        });
        builder.addCase(fetchSignIn.rejected,(state,action)=>{
            state.isLoading= false
            state.signIn= []
            state.error=action.error.message
        })

    }
})

export default signInSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signInUser, userList } from "../../api/api";

export const fetchUsers =createAsyncThunk("/userList/fetchUsers",
async()=>{
    const res =  await userList()  
    console.log('userslist thunk',res.data);
    return  res.data
})

const usersSlice = createSlice({
    name:'userList',
    initialState:{
        isLoading:false,
        userList:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(fetchUsers.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchUsers.fulfilled,(state, action)=>{
            state.isLoading= false
            state.userList=action.payload
            state.error=null
        });
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.isLoading= false
            state.userList= []
            state.error=action.error.message
        })

    }
})

export default usersSlice.reducer
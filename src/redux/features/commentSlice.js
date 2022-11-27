import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment, approveComment, editComment, removeComment } from "../../api/api";

//
export const commentAdd =createAsyncThunk("/comment/commentAdd",
async(data)=>{
    const res = await addComment(data);
    console.log('categoryCreate thunk',res?.data);
    return res?.data;
})
//
export const commentApprove =createAsyncThunk("/comment/commentApprove",
async(data)=>{
    const res = await approveComment(data);
    console.log(' thunk',res?.data);
    return res?.data;
})
//
export const commentRemove =createAsyncThunk("/comment/commentRemove",
async(data)=>{
    const res = await removeComment(data);
    console.log(' thunk',res?.data);
    return res?.data;
})
//
export const commentEdit =createAsyncThunk("/comment/commentEdit",
async(data)=>{
    const res = await editComment(data);
    console.log('edit commt thunk',res?.data);
    return res?.data;
})

const commentSlice = createSlice({
    name:'comment',
    initialState:{
        isLoading:false,
        comment:[],
        error:null
    },
    extraReducers:(builder) =>{

       
        builder.addCase(commentAdd.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(commentAdd.fulfilled,(state, action)=>{
            state.isLoading= false
            state.comment=action.payload
            state.error=null
        });
        builder.addCase(commentAdd.rejected,(state,action)=>{
            state.isLoading= false
            state.comment= []
            state.error=action.error.message
        })

        
        builder.addCase(commentApprove.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(commentApprove.fulfilled,(state, action)=>{
            state.isLoading= false
            state.comment=action.payload
            state.error=null
        });
        builder.addCase(commentApprove.rejected,(state,action)=>{
            state.isLoading= false
            state.comment= []
            state.error=action.error.message
        })

       
       
        builder.addCase(commentRemove.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(commentRemove.fulfilled,(state, action)=>{
            state.isLoading= false
            state.comment=action.payload
            state.error=null
        });
        builder.addCase(commentRemove.rejected,(state,action)=>{
            state.isLoading= false
            state.comment= []
            state.error=action.error.message
        })
      
      
        builder.addCase(commentEdit.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(commentEdit.fulfilled,(state, action)=>{
            state.isLoading= false
            state.comment=action.payload
            state.error=null
        });
        builder.addCase(commentEdit.rejected,(state,action)=>{
            state.isLoading= false
            state.comment= []
            state.error=action.error.message
        })
 
    }
})

export default commentSlice.reducer
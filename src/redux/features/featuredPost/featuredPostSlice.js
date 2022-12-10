import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createfeatured, getAllFeatured, removeFeatured } from "../../../api/api";

//
export const addFeatured = createAsyncThunk("/featured/addFeatured",
    async (data) => {
        const res = await createfeatured(data);
        console.log('addFeatured thunk', res?.data);
        return res?.data;
    })
//
export const allfeaturedGet = createAsyncThunk("/featured/allfeaturedGet",
    async () => {
        const res = await getAllFeatured();
        // console.log('allfeaturedGet thunk',res?.data);
        return res?.data;
    })
export const featuredRemove = createAsyncThunk("/featured/featuredRemove",
    async (id) => {
        const res = await removeFeatured(id);
        // console.log('allfeaturedGet thunk',res?.data);
        return res?.data;
    })


const featuredPostSlice = createSlice({
    name: 'featured',
    initialState: {
        isLoading: false,
        featured: [],
        error: null
    },
    extraReducers: (builder) => {


        builder.addCase(addFeatured.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(addFeatured.fulfilled, (state, action) => {
            state.isLoading = false
            state.featured = action.payload
            state.error = null
        });
        builder.addCase(addFeatured.rejected, (state, action) => {
            state.isLoading = false
            state.featured = []
            state.error = action.error.message
        })

        //
        builder.addCase(allfeaturedGet.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(allfeaturedGet.fulfilled, (state, action) => {
            state.isLoading = false
            state.featured = action.payload
            state.error = null
        });
        builder.addCase(allfeaturedGet.rejected, (state, action) => {
            state.isLoading = false
            state.featured = []
            state.error = action.error.message
        })

        //
        builder.addCase(featuredRemove.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(featuredRemove.fulfilled, (state, action) => {
            state.isLoading = false
            state.featured = action.payload
            state.error = null
        });
        builder.addCase(featuredRemove.rejected, (state, action) => {
            state.isLoading = false
            state.featured = []
            state.error = action.error.message
        })


    }
})

export default featuredPostSlice.reducer
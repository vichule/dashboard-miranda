import { createSlice } from "@reduxjs/toolkit";
import { commentsListThunk } from "./contactThunk";

const initialState = {
    status: "idle",
    data: [],
    error: null,
  };

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
        .addCase(commentsListThunk.pending, (state) =>{
            state.status = 'pending'
        })
        .addCase(commentsListThunk.fulfilled,(state, action) =>{
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(commentsListThunk.rejected, (state, action) =>{
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})

export const getCommentsListData = (state) => state.contacts.data
export const getCommentsListError = (state) => state.contacts.error
export const getCommentsListStatus = (state) => state.contacts.status
import { createSlice } from "@reduxjs/toolkit";
import { commentThunk, commentsListThunk } from "./contactThunk";
import { ContactsInitialState } from "../interfaces/interfaces";
import { RootState } from "../../app/store";

const initialState: ContactsInitialState = {
    status: "idle",
    data: [],
    error: null,
    comment: {
        data: null,
        status: 'idle',
        error: null
    }
  };

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        addComment(state, action){
            state.data = [action.payload, ...state.data]
        },
        removeComment(state, action){
            const commentSelect = state.data.findIndex(comment=> comment.id === action.payload.id)
            state.data.splice(commentSelect, 1);
        },
        editComment(state, action){
            const commentId = state.data.findIndex((comment) => comment.id == action.payload.id)
            state.data[commentId] = action.payload;
        },
        editCommentStatus: (state,action)=>{
            const newStatus = state.data.map((comment)=> comment.id === action.payload ? {...comment,status:!comment.status} : comment) 
            state.data = newStatus 
        },
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
            state.error = action.error.message || null
        })
        .addCase(commentThunk.pending, (state) =>{
            state.comment.status = 'pending'
        })
        .addCase(commentThunk.fulfilled, (state, action) =>{
            state.comment.status = 'fulfilled'
            state.comment.data = action.payload
        })
        .addCase(commentThunk.rejected, (state, action) =>{
            state.comment.status = 'rejected'
            state.comment.error = action.error.message || null
        })
    }
})

export const getCommentsListData = (state: RootState) => state.contacts.data
export const getCommentsListError = (state: RootState) => state.contacts.error
export const getCommentsListStatus = (state: RootState) => state.contacts.status

export const getCommentData = (state: RootState) => state.contacts.comment.data
export const getCommentError = (state: RootState) => state.contacts.comment.status
export const getCommentStatus = (state: RootState) => state.contacts.comment.error 

export const { addComment, removeComment, editComment, editCommentStatus } = contactSlice.actions
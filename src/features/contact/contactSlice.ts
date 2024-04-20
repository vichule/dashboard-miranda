import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addCommentThunk, commentThunk, commentsListThunk, editCommentThunk, removeCommentThunk } from "./contactThunk";
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(commentsListThunk.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(commentsListThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
            })
            .addCase(commentsListThunk.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || null
            })
            .addCase(commentThunk.pending, (state) => {
                state.comment.status = 'pending'
            })
            .addCase(commentThunk.fulfilled, (state, action) => {
                state.comment.status = 'fulfilled'
                state.comment.data = action.payload
            })
            .addCase(commentThunk.rejected, (state, action) => {
                state.comment.status = 'rejected'
                state.comment.error = action.error.message || null
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.comment.status = 'fulfilled'
                // state.data = [action.payload, ...state.data]
                state.data.push(action.payload)
                state.status = 'idle'
            })
            .addCase(removeCommentThunk.fulfilled, (state, action) => {
                state.comment.status = 'fulfilled'
                // const commentSelect = state.data.findIndex(comment => comment._id === action.payload.id)
                // state.data.splice(commentSelect, 1);
                state.data.filter(comment => comment._id === action.payload.id)
                state.status = 'idle'
            })
            .addCase(editCommentThunk.fulfilled, (state, action) => {
                state.comment.status = 'fulfilled'
                const newContact = action.payload
                state.data.map((contact) => { return contact._id === newContact.id ? newContact : contact})
                state.status = 'idle'
            })
            .addMatcher(
                isAnyOf(
                    addCommentThunk.pending,
                    removeCommentThunk.pending,
                    editCommentThunk.pending
                ),
                (state) => {
                    state.status = 'pending';
                }
            )
            .addMatcher(
                isAnyOf(
                    addCommentThunk.rejected,
                    removeCommentThunk.rejected,
                    editCommentThunk.rejected
                ),
                (state) => {
                    state.status = 'rejected';
                }
            )
    }
})

export const getCommentsListData = (state: RootState) => state.contacts.data
export const getCommentsListError = (state: RootState) => state.contacts.error
export const getCommentsListStatus = (state: RootState) => state.contacts.status

export const getCommentData = (state: RootState) => state.contacts.comment.data
export const getCommentError = (state: RootState) => state.contacts.comment.status
export const getCommentStatus = (state: RootState) => state.contacts.comment.error

// export const { editComment, editCommentStatus } = contactSlice.actions
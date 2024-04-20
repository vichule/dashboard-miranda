import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/apiCall";
import { ContactInterface } from "../interfaces/interfaces";

export const commentsListThunk = createAsyncThunk('contacts/fetchComments', async () =>{
    return await apiCall('contacts', 'GET')

})


export const commentThunk = createAsyncThunk('contacts/fetchComment', async (id: string) => {
    return await apiCall(`contacts/${id}`, 'GET')
})

export const addCommentThunk = createAsyncThunk('contacts/addComment', async (comment: ContactInterface) =>{
    return await apiCall('contacts', 'POST', comment)
})

export const removeCommentThunk = createAsyncThunk('contacts/removeComment', async (comment: ContactInterface) => {
    return await apiCall(`contacts/${comment._id}`, 'DELETE')
})

export const editCommentThunk = createAsyncThunk('contacts/editComment', async (comment: ContactInterface) => {
    return await apiCall(`contacts/${comment._id}`, 'PUT', comment)
})
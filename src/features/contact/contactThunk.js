import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/comments.json'

export const commentsListThunk = createAsyncThunk('contacts/fetchComments', async () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 1500)
    })

})
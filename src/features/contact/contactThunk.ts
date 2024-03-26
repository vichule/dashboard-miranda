import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/comments.json'

export const commentsListThunk = createAsyncThunk('contacts/fetchComments', async () =>{
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })

})


export const commentThunk = createAsyncThunk('users/fetchComment', async (id: number) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve((data.find((comment) => comment.id === id) || null));
        }, 200)
    })
})
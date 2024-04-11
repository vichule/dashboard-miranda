import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/users.json'


export const userListThunk = createAsyncThunk('users/fetchUsers', async () =>{
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
})


export const userThunk = createAsyncThunk('users/fetchUser', async (id: number) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve((data.find((user) => user.id === id) || null));
        }, 200)
    })
})
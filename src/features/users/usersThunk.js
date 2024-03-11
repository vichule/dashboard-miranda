import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/users.json'


export const userListThunk = createAsyncThunk('users/fetchUsers', async () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 1500)
    })
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/apiCall";
import { UserInterface } from "../interfaces/interfaces";


export const userListThunk = createAsyncThunk('users/fetchUsers', async () =>{
    return await apiCall('users', 'GET')
})


export const userThunk = createAsyncThunk('users/fetchUser', async (id: string) => {
    return await apiCall(`users/${id}`, 'GET')
})

export const addUserThunk = createAsyncThunk('users/addUser', async (user: UserInterface) =>{
    return await apiCall('users', 'POST', user)
})

export const removeUserThunk = createAsyncThunk('users/removeRoom', async (user: UserInterface) => {
    return await apiCall(`users/${user._id}`, 'DELETE')
})

export const editUserThunk = createAsyncThunk('users/editRoom', async (user: UserInterface) => {
    return await apiCall(`users/${user._id}`, 'PUT', user)
})
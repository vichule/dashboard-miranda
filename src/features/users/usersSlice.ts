import { createSlice } from "@reduxjs/toolkit";
import { userListThunk, userThunk } from "./usersThunk";
import { UsersInitialState } from "../interfaces/interfaces";
import { RootState } from "../../app/store";


const initialState: UsersInitialState = {
    status: "idle",
    data: [],
    error: null,
    user: {
        data: null,
        status: 'idle',
        error: null
    }
  };

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser(state, action){
            state.data = [action.payload, ...state.data]
        },
        removeUser(state, action){

            const userSelect = state.data.findIndex(user=> user.id === action.payload.id)
            state.data.splice(userSelect, 1);
        },
        editUser(state, action){
            
            const userId = state.data.findIndex((user) => user.id == action.payload.id)
            state.data[userId] = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(userListThunk.pending, (state) =>{
            state.status = 'pending'
        })
        .addCase(userListThunk.fulfilled, (state, action) =>{
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(userListThunk.rejected, (state, action) =>{
            state.status = 'rejected'
            state.error = action.error.message || null
        })
        .addCase(userThunk.pending, (state) =>{
            state.user.status = 'pending'
        })
        .addCase(userThunk.fulfilled, (state, action) =>{
            state.user.status = 'fulfilled'
            state.user.data = action.payload
        })
        .addCase(userThunk.rejected, (state, action) =>{
            state.user.status = 'rejected'
            state.user.error = action.error.message || null
        })
    }
})

export const getUsersData = (state: RootState) => state.users.data
export const getUsersError = (state: RootState) => state.users.error
export const getUsersStatus = (state: RootState) => state.users.status

export const getUserData = (state: RootState) => state.users.user.data
export const getUserError = (state: RootState) => state.users.user.status
export const getUserStatus = (state: RootState) => state.users.user.error 

export const { addUser, removeUser, editUser } = usersSlice.actions
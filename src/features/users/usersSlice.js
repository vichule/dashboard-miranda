import { createSlice } from "@reduxjs/toolkit";
import { userListThunk } from "./usersThunk";


const initialState = {
    status: "idle",
    data: [],
    error: null,
  };

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser(state, action){
            state.data = [action.payload, ...state.data]
        },
        removeUser(state, action){
            state.data = state.data.filter((user) => user.id !== action.payload.id)
        },
        editUser(state, action){
            const users = [...state.data]
            const userId = users.findIndex((user) => user.id == action.payload.id)
            const newUser = {...users[userId]}
            users[userId] = newUser
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
            state.error = action.error.message
        })
    }
})

export const getUsersData = (state) => state.users.data
export const getUsersError = (state) => state.users.error
export const getUsersStatus = (state) => state.users.status

export const { addUser, removeUser, editUser } = usersSlice.actions
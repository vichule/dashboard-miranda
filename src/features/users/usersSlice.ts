import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addUserThunk, editUserThunk, removeUserThunk, userListThunk, userThunk } from "./usersThunk";
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
    reducers: {},
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
        .addCase(addUserThunk.fulfilled, (state, action) => {
            state.user.status = 'fulfilled'
            //state.data = [action.payload, ...state.data]
            state.data.push(action.payload)
            state.status = 'idle'
        })
        .addCase(removeUserThunk.fulfilled, (state, action) =>{
            state.user.status = 'fulfilled'
            // const userSelect = state.data.findIndex(user=> user._id === action.payload.id)
            // state.data.splice(userSelect, 1);
            state.data.filter(user=> user._id === action.payload.id)
            state.status = 'idle'
        })
        .addCase(editUserThunk.fulfilled, (state, action) => {
            state.user.status = 'fulfilled'
            const userIndex = state.data.findIndex((user) => user._id == action.payload.id)
            state.data[userIndex] = action.payload;
            state.status = 'idle'
        })
        .addMatcher(
            isAnyOf(
              addUserThunk.pending,
              removeUserThunk.pending,
              editUserThunk.pending
            ),
            (state) => {
              state.status = 'pending';
            }
          )
          .addMatcher(
            isAnyOf(
              addUserThunk.rejected,
              removeUserThunk.rejected,
              editUserThunk.rejected
            ),
            (state) => {
              state.status = 'rejected';
            }
          )
    }
})

export const getUsersData = (state: RootState) => state.users.data
export const getUsersError = (state: RootState) => state.users.error
export const getUsersStatus = (state: RootState) => state.users.status

export const getUserData = (state: RootState) => state.users.user.data
export const getUserError = (state: RootState) => state.users.user.status
export const getUserStatus = (state: RootState) => state.users.user.error 


import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addRoomThunk, editRoomThunk, removeRoomThunk, roomListThunk, roomThunk } from "./roomsThunk";
import { RoomInterface, RoomsInitialState } from "../interfaces/interfaces";
import { RootState } from "../../app/store";

const initialState: RoomsInitialState = {
    status: "idle",
    data: [],
    error: null,
    room: {
        data: null,
        status: 'idle',
        error: null
    }
  };

  export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(roomListThunk.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(roomListThunk.fulfilled, (state, action) =>{
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(roomListThunk.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message || null
        })
        .addCase(roomThunk.pending, (state) =>{
            state.room.status = 'pending'
        })
        .addCase(roomThunk.fulfilled, (state, action) =>{
            state.room.status = 'fulfilled'
            state.room.data = action.payload
        })
        .addCase(roomThunk.rejected, (state, action) =>{
            state.room.status = 'rejected'
            state.room.error = action.error.message || null
        })
        .addCase(addRoomThunk.fulfilled, (state, action) => {
            state.room.status = 'fulfilled'
            state.data.push(action.payload)
            state.status = 'idle'
        })
        .addCase(removeRoomThunk.fulfilled, (state, action) =>{
            state.room.status = 'fulfilled'
            state.data.filter(room=> room._id === action.payload.id)
            state.status = 'idle'
        })
        .addCase(editRoomThunk.fulfilled, (state, action) => {
            state.room.status = 'fulfilled'
            state.data.map(room => room._id == action.payload.id ? action.payload : room)
            state.room.data = action.payload
            state.status = 'idle'
            
        })
        .addMatcher(
            isAnyOf(
              addRoomThunk.pending,
              removeRoomThunk.pending,
              editRoomThunk.pending
            ),
            (state) => {
              state.status = 'pending';
            }
          )
          .addMatcher(
            isAnyOf(
              addRoomThunk.rejected,
              removeRoomThunk.rejected,
              editRoomThunk.rejected
            ),
            (state) => {
              state.status = 'rejected';
            }
          )
    }
  })

  export const getRoomsData = (state: RootState) => state.rooms.data
  export const getRoomsStatus = (state: RootState) => state.rooms.status
  export const getRoomsError = (state: RootState) => state.rooms.error 

  export const getRoomData = (state: RootState) => state.rooms.room.data
  export const getRoomStatus = (state: RootState) => state.rooms.room.status
  export const getRoomError = (state: RootState) => state.rooms.room.error 

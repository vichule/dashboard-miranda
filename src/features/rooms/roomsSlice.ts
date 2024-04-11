import { createSlice } from "@reduxjs/toolkit";
import { roomListThunk, roomThunk } from "./roomsThunk";
import { RoomsInitialState } from "../interfaces/interfaces";
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
    reducers: {
        addRoom(state, action){
            state.data = [action.payload, ...state.data]
        },
        removeRoom(state, action){
            const roomSelect = state.data.findIndex(room=> room.id === action.payload.id)
            state.data.splice(roomSelect, 1);
        },
        editRoom(state, action){
            const roomId = state.data.findIndex((room) => room.id == action.payload.id)
            state.data[roomId] = action.payload;
        }
    },
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
    }
  })

  export const getRoomsData = (state: RootState) => state.rooms.data
  export const getRoomsStatus = (state: RootState) => state.rooms.status
  export const getRoomsError = (state: RootState) => state.rooms.error 

  export const getRoomData = (state: RootState) => state.rooms.room.data
  export const getRoomStatus = (state: RootState) => state.rooms.room.status
  export const getRoomError = (state: RootState) => state.rooms.room.error 

  export const { addRoom, removeRoom, editRoom } = roomsSlice.actions
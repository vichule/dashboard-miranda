import { createSlice } from "@reduxjs/toolkit";
import { roomListThunk, roomThunk } from "./roomsThunk";

const initialState = {
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
            state.data = state.data.filter((room) => room.id !== action.payload.id)
        },
        editRoom(state, action){
            const rooms = [...state.data]
            const roomId = rooms.findIndex((room) => room.id == action.payload.id)
            const newRoom = {...rooms[roomId]}
            rooms[roomId] = newRoom
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
            state.error = action.error.message
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
            state.room.error = action.error.message
        })
    }
  })

  export const getRoomsData = (state) => state.rooms.data
  export const getRoomsStatus = (state) => state.rooms.status
  export const getRoomsError = (state) => state.rooms.error 

  export const getRoomData = (state) => state.rooms.room.data
  export const getRoomStatus = (state) => state.rooms.room.status
  export const getRoomError = (state) => state.rooms.room.error 

  export const { addRoom, removeRoom, editRoom } = roomsSlice.actions
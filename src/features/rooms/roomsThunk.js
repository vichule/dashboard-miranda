import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/rooms.json'


export const roomListThunk = createAsyncThunk('rooms/fetchRooms', async () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
})

export const roomThunk = createAsyncThunk('bookings/fetchBooking', async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve((data.find((room) => room.id === id) || null));
        }, 200)
    })
})
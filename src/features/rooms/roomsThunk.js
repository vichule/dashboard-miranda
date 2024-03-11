import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/rooms.json'


export const roomListThunk = createAsyncThunk('rooms/fetchRooms', async () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 1500)
    })
})
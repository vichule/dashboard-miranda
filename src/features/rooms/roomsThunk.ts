import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/apiCall";
import { RoomInterface } from "../interfaces/interfaces";


export const roomListThunk = createAsyncThunk('rooms/fetchRooms', async () =>{
    return apiCall('rooms', 'GET')
})

export const roomThunk = createAsyncThunk('rooms/fetchRoom', async (id: string) => {
    return apiCall(`rooms/${id}`, 'GET')
})

export const addRoomThunk = createAsyncThunk('rooms/addRoom', async (room: RoomInterface) =>{
    return apiCall('rooms', 'POST', room)
})

export const removeRoomThunk = createAsyncThunk('rooms/removeRoom', async (room: RoomInterface) => {
    return apiCall(`rooms/${room._id}`, 'DELETE',)
})

export const editRoomThunk = createAsyncThunk('rooms/editRoom', async (room: RoomInterface) => {
    return apiCall(`rooms/${room._id}`, 'PUT', room)
})
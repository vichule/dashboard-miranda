import { createSlice } from "@reduxjs/toolkit";
import { bookingsListThunk } from "./bookingsThunk";



const initialState = {
    status: "idle",
    data: [],
    error: null,
  };

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(bookingsListThunk.pending, (state) =>{
            state.status = 'pending'
        })
        .addCase(bookingsListThunk.fulfilled, (state, action) =>{
            state.status = 'fulfilled'
            state.data = action.payload
        })
        .addCase(bookingsListThunk.rejected, (state, action) =>{
            state.status = 'rejected'
            state.error = state.error.message
        })
    }
})

export const getBookingsData = (state) => state.bookings.data
export const getBookingsStatus = (state) => state.bookings.status
export const getBookingsError = (state) => state.bookings.error
import { createSlice } from "@reduxjs/toolkit";
import { bookingThunk, bookingsListThunk } from "./bookingsThunk";



const initialState = {
    status: "idle",
    data: [],
    booking: {
        data: null,
        status: 'idle',
        error: null
    },
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
        .addCase(bookingThunk.pending, (state) =>{
            state.booking.status = 'pending'
        })
        .addCase(bookingThunk.fulfilled, (state, action) =>{
            state.booking.status = 'fulfilled'
            state.booking.data = action.payload
        })
        .addCase(bookingThunk.rejected, (state, action) =>{
            state.booking.status = 'rejected'
            state.booking.error = action.error.message
        })
    }
})

export const getBookingsData = (state) => state.bookings.data
export const getBookingsStatus = (state) => state.bookings.status
export const getBookingsError = (state) => state.bookings.error

export const getBookingData = (state) => state.bookings.booking.data
export const getBookingStatus = (state) => state.bookings.booking.status
export const getBookingError = (state) => state.bookings.booking.error
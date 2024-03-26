import { createSlice } from "@reduxjs/toolkit";
import { bookingThunk, bookingsListThunk } from "./bookingsThunk";
import { BookingInterface, BookingsInitialState } from "../interfaces/interfaces";
import { RootState } from "../../app/store";



const initialState: BookingsInitialState = {
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
        addBooking(state, action){
            state.data = [action.payload, ...state.data]
        },
        removeBooking(state, action){
            const bookingSelect = state.data.findIndex(booking=> booking.id === action.payload.id)
            state.data.splice(bookingSelect, 1);
        },
        editBooking(state, action){
            const bookingId = state.data.findIndex((booking) => booking.id == action.payload.id)
            state.data[bookingId] = action.payload;
        }
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
            state.error = action.error.message || null
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
            state.booking.error = action.error.message || null
        })
    }
})

export const getBookingsData = (state: RootState) => state.bookings.data
export const getBookingsStatus = (state: RootState) => state.bookings.status
export const getBookingsError = (state: RootState) => state.bookings.error

export const getBookingData = (state: RootState) => state.bookings.booking.data
export const getBookingStatus = (state: RootState) => state.bookings.booking.status
export const getBookingError = (state: RootState) => state.bookings.booking.error


export const { addBooking, removeBooking, editBooking } = bookingsSlice.actions
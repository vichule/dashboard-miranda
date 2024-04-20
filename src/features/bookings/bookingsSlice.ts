import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addBookingThunk, bookingThunk, bookingsListThunk, editBookingThunk, removeBookingThunk } from "./bookingsThunk";
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookingsListThunk.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(bookingsListThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.data = action.payload
            })
            .addCase(bookingsListThunk.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || null
            })
            .addCase(bookingThunk.pending, (state) => {
                state.booking.status = 'pending'
            })
            .addCase(bookingThunk.fulfilled, (state, action) => {
                state.booking.status = 'fulfilled'
                state.booking.data = action.payload
            })
            .addCase(bookingThunk.rejected, (state, action) => {
                state.booking.status = 'rejected'
                state.booking.error = action.error.message || null
            })
            .addCase(addBookingThunk.fulfilled, (state, action) => {
                state.booking.status = 'fulfilled'
                state.data.push(action.payload)
                state.status = 'idle'
            })
            .addCase(removeBookingThunk.fulfilled, (state, action) => {
                state.booking.status = 'fulfilled'
                state.data.filter(booking => booking._id === action.payload.id)
                state.status = 'idle'
            })
            .addCase(editBookingThunk.fulfilled, (state, action) => {
                state.booking.status = 'fulfilled'
                state.data.map((booking) => booking._id == action.payload.id ? action.payload : booking)
                state.status = 'idle'
            })
            .addMatcher(
                isAnyOf(
                    addBookingThunk.pending,
                    removeBookingThunk.pending,
                    editBookingThunk.pending
                ),
                (state) => {
                    state.status = 'pending';
                }
            )
            .addMatcher(
                isAnyOf(
                    addBookingThunk.rejected,
                    removeBookingThunk.rejected,
                    editBookingThunk.rejected
                ),
                (state) => {
                    state.status = 'rejected';
                }
            )
    }
})

export const getBookingsData = (state: RootState) => state.bookings.data
export const getBookingsStatus = (state: RootState) => state.bookings.status
export const getBookingsError = (state: RootState) => state.bookings.error

export const getBookingData = (state: RootState) => state.bookings.booking.data
export const getBookingStatus = (state: RootState) => state.bookings.booking.status
export const getBookingError = (state: RootState) => state.bookings.booking.error


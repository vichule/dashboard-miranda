import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/bookings.json'

export const bookingsListThunk = createAsyncThunk('bookings/fetchBookings', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
})

export const bookingThunk = createAsyncThunk('bookings/fetchBooking', async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve((data.find((booking) => booking.id === id) || null));
        }, 200)
    })
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/bookings.json'

export const bookingsListThunk = createAsyncThunk('bookings/fetchBookings', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 1500)
    })
})
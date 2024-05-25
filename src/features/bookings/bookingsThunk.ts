import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../../utils/apiCall";
import { BookingInterface } from "../interfaces/interfaces";

export const bookingsListThunk = createAsyncThunk('bookings/fetchBookings', async () => {
    return await apiCall('bookings', 'GET')
})

export const bookingThunk = createAsyncThunk('bookings/fetchBooking', async (id: string) => {
    return await apiCall(`bookings/${id}`, 'GET')
})

export const addBookingThunk = createAsyncThunk('bookings/addBooking', async (booking: BookingInterface) =>{
    return await apiCall('bookings', 'POST', booking)
})

export const removeBookingThunk = createAsyncThunk('bookings/removeBooking', async (booking: BookingInterface) =>{
    return await apiCall(`bookings/${booking._id}`, 'DELETE')
})

export const editBookingThunk = createAsyncThunk('bookings/editBooking', async (booking: BookingInterface) =>{
    return await apiCall(`bookings/${booking._id}`,'PUT', booking)
})
import { configureStore } from "@reduxjs/toolkit";
import { roomsSlice } from "../features/rooms/roomsSlice";
import { bookingsSlice } from "../features/bookings/bookingsSlice";
import { contactSlice } from "../features/contact/contactSlice";
import { usersSlice } from "../features/users/usersSlice";



export const store = configureStore({

    reducer: {
        'rooms': roomsSlice.reducer,
        'bookings': bookingsSlice.reducer,
        'contacts': contactSlice.reducer,
        'users': usersSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
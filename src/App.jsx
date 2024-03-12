import './App.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/LoginPage.jsx'
import { Dashboard } from './pages/DashboardPage.jsx'
import { Bookings } from './pages/BookingsPage.jsx'
import { Rooms } from './pages/RoomsPage.jsx'
import { Users } from './pages/UsersPage.jsx'
import { Contact } from './pages/ContactPage.jsx'
import { AuthProvider } from './contexts/AuthContext/auth.jsx' 
import { RequireAuth } from './contexts/AuthContext/RequireAuth.jsx'
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from './styles/theme.jsx'
import { Layout } from './pages/LayoutPage.jsx'
import { BookingID } from './pages/BookingPage.jsx'
import { RoomID } from './pages/RoomPage.jsx'




function App() {
  const [ theme, setTheme ] = useState('light')
  const isDarkTheme = theme === 'dark'

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyles/>
          <AuthProvider>
            <Provider store={store}>
              <BrowserRouter>
                <Routes>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='' element={<RequireAuth><Layout/></RequireAuth>}>
                    <Route path='/' element={<RequireAuth><Dashboard/></RequireAuth>}/>
                    <Route path='bookings' element={<RequireAuth><Bookings/></RequireAuth>}/>
                    <Route path='bookings/booking/:id' element={<BookingID />} />
                    <Route path='rooms' element={<RequireAuth><Rooms/></RequireAuth>}/>
                    <Route path='rooms/room/:id' element={<RoomID />} />
                    <Route path='users' element={<RequireAuth><Users/></RequireAuth>}/>
                    <Route path='contact' element={<RequireAuth><Contact/></RequireAuth>}/>
                  </Route>
                </Routes>
              </BrowserRouter>
            </Provider>
          </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App

import './App.css'
import React, { useEffect, useState } from 'react'
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
import { RequireAuth } from './auth/RequireAuth.jsx'
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from './styles/theme.jsx'
import { Layout } from './pages/LayoutPage.jsx'
import { BookingID } from './pages/BookingPage.jsx'
import { RoomID } from './pages/RoomPage.jsx'
import { UserID } from './pages/UserPage.jsx'




function App() {
  const [ theme, setTheme ] = useState('light')
  const isDarkTheme = theme === 'dark'
  
  const userLoged = localStorage.getItem('user') ? (localStorage.getItem('user') === "true" ? true : false) : false;
  const [authUser, setAuthUser] = useState(userLoged);

  useEffect(() => {

    localStorage.setItem('user', authUser ? 'true' : 'false');

  }, [authUser]);

  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyles/>
          <AuthProvider>
            <Provider store={store}>
              <BrowserRouter>
                <Routes>
                  <Route path='/login' element={<Login authUser={authUser} setAuthUser={setAuthUser}/>}/>
                  <Route path='' element={<RequireAuth authUser={authUser}><Layout/></RequireAuth>}>
                    <Route path='/' element={<RequireAuth authUser={authUser}><Dashboard/></RequireAuth>}/>
                    <Route path='bookings' element={<RequireAuth authUser={authUser}><Bookings/></RequireAuth>}/>
                    <Route path='bookings/booking/:id' element={<BookingID />} />
                    <Route path='rooms' element={<RequireAuth authUser={authUser}><Rooms/></RequireAuth>}/>
                    <Route path='rooms/room/:id' element={<RoomID />} />
                    <Route path='users' element={<RequireAuth authUser={authUser}><Users/></RequireAuth>}/>
                    <Route path='users/user/1' element={<UserID />} />
                    <Route path='contact' element={<RequireAuth authUser={authUser}><Contact/></RequireAuth>}/>
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

import './App.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/LoginPage'
import { Dashboard } from './pages/DashboardPage'
import { Bookings } from './pages/BookingsPage'
import { Rooms } from './pages/RoomsPage'
import { Users } from './pages/UsersPage'
import { Contact } from './pages/ContactPage'
import { AuthProvider } from './contexts/AuthContext/auth' 
import { RequireAuth } from './auth/RequireAuth'
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from './styles/theme.jsx'
import { Layout } from './pages/LayoutPage'
import { BookingID } from './pages/BookingPage'
import { RoomID } from './pages/RoomPage'
import { UserID } from './pages/UserPage'
import { NewUserPage } from './pages/NewUserPage'
import { NewRoomPage } from './pages/NewRoomPage'
import { NewBookingPage } from './pages/NewBookingPage'
import { RoomForm } from './components/Forms/RoomForm'
import { BookingForm } from './components/Forms/BookingForm'




function App() {
  const [ theme, setTheme ] = useState('light')
  const isDarkTheme = theme === 'dark'
  
  const userLoged = localStorage.getItem('user') ? (localStorage.getItem('user') === "true" ? true : false) : false;
  const [authUser, setAuthUser] = useState<boolean>(userLoged);

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
                    <Route path='bookings/newbooking' element={<NewBookingPage/>}/>
                    <Route path='bookings/editbooking/:id' element={<BookingForm />} />
                    <Route path='rooms' element={<RequireAuth authUser={authUser}><Rooms/></RequireAuth>}/>
                    <Route path='rooms/room/:id' element={<RoomID />} />
                    <Route path='rooms/newroom' element={<NewRoomPage/>}/>
                    <Route path='rooms/editroom/:id' element={<RoomForm/>}/>
                    <Route path='users' element={<RequireAuth authUser={authUser}><Users/></RequireAuth>}/>
                    <Route path='users/user/:id' element={<UserID />} />
                    <Route path="/users/newuser" element={<NewUserPage/>}/>
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

// if(window.Cypress){
//   window.store = store
// }

export default App

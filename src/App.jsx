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
                  <Route path='/' element={<Login/>}/>
                  <Route path='/root' element={<RequireAuth><Layout/></RequireAuth>}>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='bookings' element={<Bookings/>}/>
                    <Route path='rooms' element={<Rooms/>}/>
                    <Route path='users' element={<Users/>}/>
                    <Route path='contact' element={<Contact/>}/>
                  </Route>
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </BrowserRouter>
            </Provider>
          </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App

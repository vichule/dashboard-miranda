import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login/login.jsx'
import { Dashboard } from './pages/dashboard/dashboard.jsx'
import { Bookings } from './pages/bookings/bookings.jsx'
import { Rooms } from './pages/rooms/rooms.jsx'
import { Users } from './pages/users/user.jsx'
import { Contact } from './pages/contact/contact.jsx'
import { AuthProvider } from './contexts/AuthContext/auth.jsx' 
import { RequireAuth } from './contexts/AuthContext/RequireAuth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
            <Route path='bookings' element={<Bookings/>}/>
            <Route path='rooms' element={<Rooms/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='contact' element={<Contact/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </AuthProvider>
  </React.StrictMode>,
)

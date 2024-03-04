import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)

    const login = (userName, password) => {
        
        return new Promise((resolve, reject) => {

            if (userName === 'admin' && password === 'password'){
                setUser({name: userName})
                resolve('success')
            } else {
                reject('Incorrect password or username')
                
            }
        })
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
    }
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
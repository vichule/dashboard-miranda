import { createContext, useContext } from "react";


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const logout = () => {
        localStorage.clear()
    }
    

    return (
        <AuthContext.Provider value={{ logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
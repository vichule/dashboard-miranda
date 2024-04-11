import { createContext, useContext } from "react";


const AuthContext = createContext({
        logout: ()=>{}
    })


export const AuthProvider = ({ children }: {children: React.ReactElement}) => {

    const logout = () => {
        localStorage.clear()
    }
    

    return (
        <AuthContext.Provider value={{ logout: logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./auth"

export const RequireAuth = ({ children }) => {
    let location = useLocation()
    const auth = useAuth()

    
    if(!auth.user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }


    return children
}
import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children, authUser }) => {
    let location = useLocation()
    
    if(!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }


    return children
}
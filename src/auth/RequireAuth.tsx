import { Navigate, useLocation } from "react-router-dom"

export const RequireAuth = ({ children, authUser }: {children: React.ReactElement, authUser: boolean}) => {
    let location = useLocation()
    
    if(!authUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }


    return children
}
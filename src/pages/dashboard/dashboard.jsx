import { Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext/auth"


export const Dashboard = () => {

    const auth = useAuth()

const handleLogout = () => {

    auth.logout()
}

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Log out</button>
            <Outlet/>
        </>
    )
}
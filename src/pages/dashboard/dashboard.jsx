import { Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext/auth"
import { LateralMenu } from "../../components/lateral-menu/lateralmenu"
import { TopMenu } from "../../components/top-menu/topmenu"


export const Dashboard = () => {

    const auth = useAuth()

const handleLogout = () => {

    auth.logout()
}

    return (
        <>
            <TopMenu/>
            <h1>Dashboard</h1>
            <LateralMenu/>
            <button onClick={handleLogout}>Log out</button>
            <Outlet/>
        </>
    )
}
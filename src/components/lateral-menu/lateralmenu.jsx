import { NavLink } from "react-router-dom"
import { LuLayoutDashboard } from "react-icons/lu";
import { SlKey } from "react-icons/sl";
import { TbCalendarCheck } from "react-icons/tb";
import { HiOutlinePuzzle } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";

export const LateralMenu = () => {



    return (
        <>
            <nav>
                <ul>
                    <li><NavLink className={({ isActive }) => (isActive ? 'NavBar active' : 'NavBar')} to='/dashboard'><LuLayoutDashboard/> Dashboard </NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'NavBar active' : 'NavBar')} to='/dashboard/bookings'><TbCalendarCheck/> Bookings </NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'NavBar active' : 'NavBar')} to='/dashboard/rooms'><SlKey style = {{transform: 'rotate(-45deg)' }}/> Rooms </NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'NavBar active' : 'NavBar')} to='/dashboard/contact'><HiOutlinePuzzle/> Contact </NavLink></li>
                    <li><NavLink className={({ isActive }) => (isActive ? 'NavBar active' : 'NavBar')} to='/dashboard/users'><HiOutlineUser/> Users </NavLink></li>
                </ul>
            </nav>
            <div>
                <img src="" alt="" />
                <h2>Javier Cabañas</h2>
                <p>fake.email@gmail.com</p>
                <button>Edit</button>
            </div>
        </>
    )
}
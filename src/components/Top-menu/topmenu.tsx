
import styled, { ThemeContext, useTheme } from "styled-components";
import { ArrowClosed, ArrowOpened, LightsOff, LightsOn, icons } from "../../styles/icons";
import { useAuth } from "../../contexts/AuthContext/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface TopMenuProp {
    toggleMenu: React.MouseEventHandler<HTMLButtonElement>,
    isSideMenuOpen: boolean
}


export const TopMenu = ({ toggleMenu, isSideMenuOpen}: TopMenuProp) => {
    const auth = useAuth()
    const locationPath = useLocation().pathname
    const { id } = useParams()
    const navigator = useNavigate()
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        auth.logout()
        navigator('/login')
    }

    const handleContact = () => {
        navigator('/contact')
    }


    const namePaths = {
      '/': 'Dashboard',
      '/bookings': 'Bookings',
      '/rooms': 'Rooms',
      '/contact': 'Contact',
      '/users': 'Users',
      [`/bookings/booking/${id}`]: `Bookings > Booking #${id} `,
      [`/rooms/room/${id}`]: `Rooms > Room  #${id} `,
      [`/users/user/${id}`]: `Users > Edit User #${id}`,
      '/users/newuser': 'Users > New User',
      '/rooms/newroom': 'Rooms > New Room',
      [`/rooms/editroom/${id}`]: `Rooms > Edit Room #${id}`,
      '/bookings/newbooking': 'Bookings > New Booking',
      [`/bookings/editbooking/${id}`]: `Bookings > Edit Booking #${id}`,
    }

    const currentNamePage = namePaths[locationPath] || 'Error Path Name'


    return (
        <>
            <HeaderNav>
                <div>
                    <button onClick={toggleMenu}>{isSideMenuOpen ? <ArrowOpened/> : <ArrowClosed/>}</button>
                </div>
                <h1>{currentNamePage}</h1>
                    <NavIcons>
                        <button onClick={handleContact}>{icons.mail}</button>
                        <button onClick={handleLogout} id="logout">{icons.logout}</button>
                    </NavIcons>
                {theme === 'dark' ? <LightsOff onClick={() => {
                        setTheme('light');
                    }}>
                    </LightsOff> : <LightsOn onClick={() => {
                        setTheme('dark');
                    }}>
                    </LightsOn>}
            </HeaderNav>
        </>
    )
}

 const HeaderNav = styled.div`
    
    background-color: ${({theme}) => theme.bgSecond};
    display: flex;
    align-items: center;
    padding: 3em 5em;
    gap: 3em;

    h1{
        font-size: 2.8rem;
        font-weight: 600;
        line-height: 4.2rem;
        color: ${({theme}) => theme.mainText}
    }

    button{
        background: none;
        border: none;
        
    }
    
`

const NavIcons = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 5em;

    
`

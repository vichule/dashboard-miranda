
import styled from "styled-components";
import { ArrowClosed, ArrowOpened, LightsOff, LightsOn, icons } from "../../styles/icons";
import { colors } from "../../styles/colors";
import { useAuth } from "../../contexts/AuthContext/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ThemeButtonStyled } from "../Button/BtnTheme";

interface TopMenuProp {
    toggleMenu: React.MouseEventHandler<HTMLButtonElement>,
    isSideMenuOpen: boolean
}


export const TopMenu = ({ toggleMenu, isSideMenuOpen}: TopMenuProp) => {
    const auth = useAuth()
    const locationPath = useLocation().pathname
    const [ theme, setTheme ] = useState(true)
    const { id } = useParams()
    const navigator = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigator('/login')
    }

    const handleContact = () => {
        navigator('/contact')
    }

    const toggleTheme = () => {
        setTheme(!theme)
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
                        {/* <button>{icons.bell}</button> */}
                        <button onClick={handleLogout} id="logout">{icons.logout}</button>
                    </NavIcons>
                {/* <button onClick={toggleTheme}>{theme ? <LightsOn/> : <LightsOff/>}</button> */}
                <ThemeButtonStyled onClick={toggleTheme} $isActive={theme}><LightsOn/></ThemeButtonStyled>
            </HeaderNav>
        </>
    )
}

 const HeaderNav = styled.div`
    
    background-color: ${colors.white};
    display: flex;
    align-items: center;
    padding: 3em 5em;
    gap: 3em;
    box-shadow: 6px 0px 5px 0px;

    h1{
        font-size: 2.8rem;
        font-weight: 600;
        line-height: 4.2rem;
        color: ${colors.black}
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

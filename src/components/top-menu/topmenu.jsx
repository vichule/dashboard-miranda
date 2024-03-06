
import styled from "styled-components";
import { ArrowClosed, ArrowOpened, LightsOff, LightsOn, icons } from "../../styles/icons";
import { colors } from "../../styles/colors";
import { useAuth } from "../../contexts/AuthContext/auth";
import { useLocation } from "react-router-dom";
import { useState } from "react";




export const TopMenu = ({ toggleMenu, isSideMenuOpen}) => {
    const auth = useAuth()
    const locationPath = useLocation()
    const { pathname } = locationPath
    const [ theme, setTheme ] = useState(true)

    const handleLogout = () => {
        auth.logout()
    }

    const toggleTheme = () => {
        setTheme(!theme)
      }

    const namePaths = {
      '/root/dashboard': 'Dashboard',
      '/root/bookings': 'Bookings',
      '/root/rooms': 'Rooms',
      '/root/contact': 'Contact',
      '/root/users': 'Users',
    }

    const currentNamePage = namePaths[pathname] || 'Error Path Name'

    return (
        <>
            <HeaderNav>
                <div>
                    <button onClick={toggleMenu}>{isSideMenuOpen ? <ArrowOpened/> : <ArrowClosed/>}</button>
                </div>
                <h1>{currentNamePage}</h1>
                    <NavIcons>
                        <button>{icons.mail}</button>
                        <button>{icons.bell}</button>
                        <button onClick={handleLogout}>{icons.logout}</button>
                    </NavIcons>
                <button onClick={toggleTheme}>{theme ? <LightsOn/> : <LightsOff/>}</button>
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
        color: ${colors.black};

        
    }
    
`

const NavIcons = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 5em;

    
`


import styled from "styled-components";
import { icons } from "../../styles/icons";
import { colors } from "../../styles/colors";


const NavIcons = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-around;
`

const HeaderNav = styled.nav`
    background-color: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export const TopMenu = () => {



    return (
        <>
            <HeaderNav>
                <div>
                    <button>{icons.arrowOpen}</button>
                    <button style={{display: 'none'}}>{icons.arrowClose}</button>
                </div>
                <div>
                    <NavIcons>
                        <li><button>{icons.mail}</button></li>
                        <li><button>{icons.bell}</button></li>
                        <li><button>{icons.logout}</button></li>
                    </NavIcons>
                </div>
                <button>{icons.lights}</button>
            </HeaderNav>
        </>
    )
}
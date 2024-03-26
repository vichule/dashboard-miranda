import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Logo from "../../assets/travl.png"
import MyPic from "../../assets/profilePic.jpeg"
import { BasicBtnStyled } from "../Button/BtnStyled";
import { CalendarIconMenu, DashboardIconMenu, KeyIconMenu, PuzzleIconMenu, UserIconMenu } from "../../styles/icons";

interface LateralProp {
    isOpen: boolean
}
export const LateralMenu = ({ isOpen }: LateralProp) => {



    return (
        
            isOpen && <LateralMenuStyled>
                <LogoStyled src={Logo}/>
                <UlStyled>
                    <LiStyled><NavLinkStyled to='/'><DashboardIconMenu/> Dashboard </NavLinkStyled></LiStyled>
                    <LiStyled><NavLinkStyled to='/bookings'><CalendarIconMenu/> Bookings </NavLinkStyled></LiStyled>
                    <LiStyled><NavLinkStyled to='/rooms'><KeyIconMenu/> Rooms </NavLinkStyled></LiStyled>
                    <LiStyled><NavLinkStyled to='/contact'><PuzzleIconMenu/> Contact </NavLinkStyled></LiStyled>
                    <LiStyled><NavLinkStyled to='/users'><UserIconMenu/> Users </NavLinkStyled></LiStyled>
                </UlStyled>
                <CardStyled>
                    <img src={MyPic} alt="" />
                    <h2>Javier Cabañas</h2>
                    <p>fake.email@gmail.com</p>
                    <BasicBtnStyled>Edit</BasicBtnStyled>
                </CardStyled>
                <LateralFooter>
                    <h2>Travl Hotel Admin Dashboard</h2>
                    <p>© 2024 All Rights Reserved</p>
                    <p>Made with ♥ by JavierCB</p>
                </LateralFooter>
            </LateralMenuStyled>
        
    )
}

export const LateralMenuStyled = styled.div`
    max-width: 30rem;
    min-height: 970px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: white;
    padding: 0em 3em;
    box-shadow: 0px 0px 5px 0px;
    align-items: center;
`

export const CardStyled = styled.div`
    margin: 0 auto;
    max-width: 30rem;
    border-radius: 2em ;
    box-shadow: 0px 0px 30px 15px #00000014;
    padding: 3em;
    text-align: center;
    gap: 3em;
    background-color: ${colors.white};

    img{
        width: 40%;
        border-radius: 1em;
    }

    h2{
        margin: 0.5em 0em;
        font-size: 1.8rem;
        color: ${colors.black};
    }

    p{
        margin: 0.5em 0em 1em 0em;
        font-size: 1.2rem;
        color: ${colors.black};
    }


`

export const LateralFooter = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;

    p{
        font-size: 1.2rem;
        font-weight:400;
        color:#799283;
        line-height: 2.1rem;
    }

    h2{
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 2.5rem;
        color: ${colors.black}
    }
`

export const NavLinkStyled = styled(NavLink)`
    color: #799283;    
    font-size: 1.8rem;
    font-weight:400;
    line-height: 2.1rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap:2em;
    padding-left: 2em;
    &.active {
        color: #E23428;
        font-weight: 600;
        border-left: 5px solid ${colors.red};
        border-radius: 5px;
  }
`

export const UlStyled = styled.ul`
    list-style: none;
`

export const LiStyled = styled.li `
     margin-bottom: 20%;
`

const LogoStyled = styled.img`
    width: 100%;
    padding: 1rem;
    margin: 0 auto 2rem auto;
`
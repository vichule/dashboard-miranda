import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { colors } from "../../styles/colors";
import Logo from "../../assets/travl.png"
import MyPic from "../../assets/profilePic.jpeg"
import { BasicBtnStyled } from "../Button/BtnStyled";
import { CalendarIconMenu, DashboardIconMenu, KeyIconMenu, PuzzleIconMenu, UserIconMenu } from "../../styles/icons";
import { useAuth } from "../../contexts/AuthContext/auth";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { errorToast, successToast } from "../Swal/myToast";

const MySwal = withReactContent(Swal);

interface LateralProp {
    isOpen: boolean
}
export const LateralMenu = ({ isOpen }: LateralProp) => {
    const { user, setAuthUser } = useAuth();

    const handleEdit = () => {
        MySwal.fire({
            title: 'Edit User Card',
            html:
                `<input id="name" class="swal2-input" placeholder="Name" value="${user.name || ''}">` +
                `<input id="lastName" class="swal2-input" placeholder="Last Name" value="${user.lastName || ''}">` +
                `<input id="email" class="swal2-input" placeholder="Email" value="${user.email || ''}">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = (document.getElementById('name') as HTMLInputElement).value;
                const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
                const email = (document.getElementById('email') as HTMLInputElement).value;
                return { name, lastName, email };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthUser(result.value);
                successToast.fire()
            }else if(result.isDenied){
                errorToast.fire()
            }
        });
    };
    return (

        isOpen && <LateralMenuStyled>
            <LogoStyled src={Logo} />
            <UlStyled>
                <LiStyled><NavLinkStyled to='/'><DashboardIconMenu /> Dashboard </NavLinkStyled></LiStyled>
                <LiStyled><NavLinkStyled to='/bookings'><CalendarIconMenu /> Bookings </NavLinkStyled></LiStyled>
                <LiStyled><NavLinkStyled to='/rooms'><KeyIconMenu /> Rooms </NavLinkStyled></LiStyled>
                <LiStyled><NavLinkStyled to='/contact'><PuzzleIconMenu /> Contact </NavLinkStyled></LiStyled>
                <LiStyled><NavLinkStyled to='/users'><UserIconMenu /> Users </NavLinkStyled></LiStyled>
            </UlStyled>
            <CardStyled>
                <img src={MyPic} alt="" />
                <h2>Welcome {user.name} {user.lastName}!</h2>
                <p>{user.email}</p>
                <BasicBtnStyled onClick={handleEdit}>Edit</BasicBtnStyled>
            </CardStyled>
            <LateralFooter>
                <h2>Travl Hotel Admin Dashboard</h2>
                <p>© 2024 All Rights Reserved</p>
                <p>Made with ♥ by JavierCD</p>
            </LateralFooter>
        </LateralMenuStyled>

    )
}

export const LateralMenuStyled = styled.div`
    max-width: 30rem;
    gap: 4em;
    //min-height: 1300px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgSecond};
    padding: 3em 3em;
    box-shadow: -5px -6px 11px 0px black;
    align-items: center;
    justify-content: flex-start;
    z-index: 2;
`

export const CardStyled = styled.div`
    margin: 0 auto;
    max-width: 30rem;
    border-radius: 2em ;
    box-shadow: 0px 0px 30px 15px #00000014;
    padding: 3em;
    text-align: center;
    gap: 3em;
    background-color: ${({ theme }) => theme.bgCard};

    img{
        width: 40%;
        border-radius: 1em;
    }

    h2{
        margin: 0.5em 0em;
        font-size: 1.8rem;
        color: ${({ theme }) => theme.mainText};
    }

    p{
        margin: 0.5em 0em 1em 0em;
        font-size: 1.2rem;
        color: ${colors.grey};
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
        color: ${({ theme }) => theme.mainText}
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

export const LiStyled = styled.li`
     margin-bottom: 20%;
`

const LogoStyled = styled.img`
    width: 100%;
    padding: 1rem;
    margin: 0 auto 2rem auto;
`
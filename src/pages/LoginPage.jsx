import { useEffect, useReducer, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext/auth"
import logo from '../assets/Logo.png'
import Background from '../assets/beach.jpg'
import { BasicBtnStyled } from "../components/Button/BtnStyled"
import styled from "styled-components"
import { colors } from "../styles/colors"

export const Login = () => {
    const navigator = useNavigate()
    const [ user, setUser ] = useState({name:'', password: ''})
    const [ formData, setFormData ] = useReducer((formData, newItem) => { return ({...formData, ...newItem} )}, {userName: '', password:''})
    const [ errorMsg, setErrorMsg] = useState('')
    const auth = useAuth()
    

    let location = useLocation()
    let from = location.state?.from?.pathname || "/"

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            await auth.login(formData.userName, formData.password)
            navigator(from, { replace: true });
        }catch (error){
            setErrorMsg(error)
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }, []);

    return (
            <LoginPageStyled style={{backgroundImage: `url(${Background})`}}>
                <LoginContainer>
                    <div><img src={logo} alt="" /></div>
                    <form onSubmit={handleLogin}>

                        <InputContainer>
                            <LoginLabel htmlFor="username">Username</LoginLabel>
                            <input value={formData.userName} placeholder="example@example.com" name="username" id="username" type="text" onChange={ (e) => setFormData({userName: e.target.value})} />
                        </InputContainer>
                        <InputContainer>
                            <LoginLabel htmlFor="password">Password</LoginLabel>
                            <input value={formData.password} placeholder="exampleword" name="password" id="password" type="password" onChange={ (e) => setFormData({password: e.target.value})}/>
                        </InputContainer>

                        <p>admin@admin.co</p>
                        <p>adminadmin</p>
                    
                        <BasicBtnStyled type="submit" style={{marginTop: '5em'}}>Log In</BasicBtnStyled>
                    </form>
                </LoginContainer>
                { errorMsg ? <ErrorContainer>{errorMsg}</ErrorContainer> : null }
            </LoginPageStyled>
            
    )
}

const LoginPageStyled = styled.div`
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 97rem;
    display: grid;
    align-items: center;
    align-content: center;
    justify-content: center;
`

const LoginContainer = styled.div`
    background-color: ${colors.black};
    min-height: 50rem;
    display: grid;
    justify-content: center;
    align-content: space-evenly;
    border-radius: 5em;
    margin: 0 auto;
    width: 45rem;

    p{
        color: ${colors.white};
    }
`
const ErrorContainer = styled.div`
    background-color: ${colors.red};
    width: 100%;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    font-size: 1.3rem;
    color: ${colors.white};
    margin-top: 1em;
`

const LoginLabel = styled.label`
    color: ${colors.lightGreen};
    font-size: 1.5rem;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 5em;
    margin-bottom: 2em;
    justify-content: space-between;     
`
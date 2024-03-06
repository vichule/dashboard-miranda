import { useEffect, useReducer, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext/auth"


export const Login = () => {
    const navigator = useNavigate()
    const [ user, setUser ] = useState({name:'', password: ''})
    const [ formData, setFormData ] = useReducer((formData, newItem) => { return ({...formData, ...newItem} )}, {userName: '', password:''})
    const [ errorMsg, setErrorMsg] = useState('')
    const auth = useAuth()
    

    let location = useLocation()
    let from = location.state?.from?.pathname || "/root"

    const handleLogin = async () => {
        
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
        <>
            <h1>LOGIN PAGE</h1>
            <div>
                <input value={formData.userName} placeholder="Username" name="username" id="username" type="text" onChange={ (e) => setFormData({userName: e.target.value})} />
            </div>
            <div>
                <input value={formData.password} placeholder="Password" name="password" id="password" type="password" onChange={ (e) => setFormData({password: e.target.value})}/>
            </div>
            <div>
                <button onClick={handleLogin}>Log in</button>
            </div>
            { errorMsg ? <div>{errorMsg}</div> : null }
        </>
    )
}
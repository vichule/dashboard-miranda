import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUserData, getUserStatus, getUsersData, getUsersError, getUsersStatus, removeUser } from "../features/users/usersSlice"
import { useCallback, useEffect, useState } from "react"
import { userListThunk, userThunk } from "../features/users/usersThunk"
import { UserForm } from "../components/Forms/UserForm"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { UserInterface } from "../features/interfaces/interfaces"


export const UserID = () => {
    const navigator = useNavigate()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [ spinner, setSpinner ] = useState(true)

    const usersData = useAppSelector(getUsersData)
    const usersDataStatus = useAppSelector(getUsersStatus)
    const usersDataError = useAppSelector(getUsersError)

    const userData = useSelector(getUserData)
    const userDataStatus = useSelector(getUserStatus)
    const [user, setUser] = useState<UserInterface>({
        
        id: 0,
        first_name: "",
        last_name:"",
        email: "",
        start_date: "",
        description: "",
        phone: "",
        photo: "",
        status: ""
        })


    useEffect(() => {
        if (usersDataStatus === "idle") {
            dispatch(userListThunk());
          } else if (usersDataStatus === "pending") {
           
          } else if (usersDataStatus === "fulfilled") {
            const specificUser = usersData.find((user) => user.id.toString() === id) || {} as UserInterface;
            setUser(specificUser)
            setSpinner(false)
           
        }
      }, [dispatch,usersDataStatus,usersData])

    const handleBack = () =>{
        navigator(-1)
    }

    const handleDeleteUser = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        navigator('/users')
        dispatch(removeUser(user))
    }
    const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        dispatch(editUser(user))
        navigator('/users')
    }
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      };

    return(
        <>

            <div style={{padding: '5em'}}>
                <GreenBtnStyled onClick={handleBack}>Back</GreenBtnStyled>
                {spinner ? <p>Loading</p> : <UserForm user={user} change={handleChange} remove={handleDeleteUser} save={handleSaveUser}/>}
                
            </div>
        
        </>
    )
}
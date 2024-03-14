import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUserData, getUserStatus, getUsersData, getUsersError, getUsersStatus, removeUser } from "../features/users/usersSlice"
import { useCallback, useEffect, useState } from "react"
import { userListThunk, userThunk } from "../features/users/usersThunk"
import { UserForm } from "../components/Forms/UserForm"


export const UserID = () => {
    const navigator = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [ spinner, setSpinner ] = useState(true)

    const usersData = useSelector(getUsersData)
    const usersDataStatus = useSelector(getUsersStatus)
    const usersDataError = useSelector(getUsersError)

    const userData = useSelector(getUserData)
    const userDataStatus = useSelector(getUserStatus)
    const [user, setUser] = useState({
        
        id: "",
        first_name: "",
        last_name:"",
        email: "",
        start_date: "",
        description: "",
        phone: "",
        photo: "",
        status: ""
        })

    // const api = useCallback(async () => {
    //     await dispatch(userThunk(parseInt(id))).unwrap();
        
    //     setUser(userData)
    //     setSpinner(false)
    // }, [id, dispatch, user]);

    // useEffect(() => {
    //     api();
        
    // }, [api, id]);

    useEffect(() => {
        if (usersDataStatus === "idle") {
            dispatch(userListThunk());
          } else if (usersDataStatus === "pending") {
           
          } else if (usersDataStatus === "fulfilled") {
            const specificUser = usersData.find((user) => user.id.toString() === id);
            setUser(specificUser)
            setSpinner(false)
           
        }
      }, [dispatch,usersDataStatus,usersData])

    const handleBack = () =>{
        navigator(-1)
    }

    const handleDeleteUser = (event) =>{
        event.preventDefault()
        navigator('/users')
        dispatch(removeUser(user))
        console.log('delete')
    }
    const handleSaveUser = (event) =>{
        event.preventDefault()
        dispatch(editUser(user))
        navigator('/users')
        console.log('save')
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      };

    return(
        <>

            <div>
                <button onClick={handleBack}>Back</button>
                {spinner ? <p>Loading</p> : <UserForm user={user} change={handleChange} remove={handleDeleteUser} save={handleSaveUser}/>}
                
            </div>
        
        </>
    )
}
import { useNavigate, useParams } from "react-router-dom"
import { getUsersData, getUsersError, getUsersStatus } from "../features/users/usersSlice"
import { useEffect, useState } from "react"
import { editUserThunk, removeUserThunk, userListThunk, userThunk } from "../features/users/usersThunk"
import { UserForm } from "../components/Forms/UserForm"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import Swal from "sweetalert2"
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

    const [user, setUser] = useState<UserInterface>({
        
        _id: '',
        first_name: "",
        last_name:"",
        email: "",
        start_date: "",
        description: "",
        phone: "",
        photo: "",
        status: "",
        password: ""
        })


    useEffect(() => {
        if (usersDataStatus === "idle") {
            dispatch(userListThunk());
          } else if (usersDataStatus === "pending") {
           
          } else if (usersDataStatus === "fulfilled") {
            const specificUser = usersData.find((user) => user._id === id) || {} as UserInterface;
            setUser(specificUser)
            setSpinner(false)
           
        }
      }, [dispatch,usersDataStatus,usersData])

    const handleBack = () =>{
        navigator(-1)
    }

    const handleDeleteUser = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        Swal.fire({
            title: "This will delete the user",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
                navigator('/users')
                dispatch(removeUserThunk(user))
              Swal.fire("Done!", "The user has been deleted.", "success");
            }
          })
    }
    const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        dispatch(editUserThunk(user))
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
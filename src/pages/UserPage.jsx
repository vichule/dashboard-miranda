import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editUser, getUserData, getUserStatus, getUsersData, getUsersError, getUsersStatus, removeUser } from "../features/users/usersSlice"
import { useCallback, useEffect, useState } from "react"
import { userListThunk, userThunk } from "../features/users/usersThunk"


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
        photo: ""
        })

    const api = useCallback(async () => {
        await dispatch(userThunk(parseInt(id))).unwrap();
        
        setUser(userData)
        setSpinner(false)
    }, [id, dispatch, user]);

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
                {spinner ? <p>Loading</p> : <form onSubmit={handleSaveUser}>
                    <div>
                        <label htmlFor="firstName"></label>
                        <input type="text" name="first_name" value={user.first_name || ''} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="lastName"></label>
                        <input type="text" name="last_name" value={user.last_name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="job"></label>
                        <select name="job" id="job" onChange={handleChange}>
                            <option value="true">Room Service</option>
                            <option value="false">Manager</option>
                            <option value="false">Recepcionist</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email" name="email" value={user.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phone"></label>
                        <input type="tel" name="phone" value={user.phone} onChange={handleChange}/>
                    </div>
                    
                    <div>
                        <label htmlFor="description"></label>
                        <textarea name="description" id="description" cols="30" rows="10" value={user.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="state"></label>
                        <select name="state" id="state" onChange={handleChange}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={handleDeleteUser}>Delete User</button>
                    </div>
                </form>}
                
            </div>
        
        </>
    )
}
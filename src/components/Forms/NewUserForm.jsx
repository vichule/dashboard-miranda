import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser, getUsersData, getUsersError, getUsersStatus } from "../../features/users/usersSlice"
import { useEffect, useState } from "react"
import { userListThunk } from "../../features/users/usersThunk"



export const NewUserForm = () =>{
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const usersData = useSelector(getUsersData)
    const usersDataError = useSelector(getUsersError)
    const usersDataStatus = useSelector(getUsersStatus)
    const [ userId, setUserId ] = useState(0)

    useEffect(()=>{
        if (usersDataStatus === 'idle'){
            dispatch(userListThunk())
        } else if (usersDataStatus === 'pending'){

        } else if (usersDataStatus === 'fulfilled'){
            setUserId(usersData.length + 1)
        } else if (usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }
    },[usersData,usersDataStatus,dispatch])

    const handleBack = () =>{
        navigator('/users')
    }

    const handleCreate = (event)=>{
        event.preventDefault()
        const newUser ={
            
            id: userId,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: event.target.email.value,
            start_date: "20/03/2024",
            description: event.target.description.value,
            phone: event.target.phone.value,
            photo:"http://dummyimage.com/105x100.png/dddddd/000000",
            status: event.target.status.value 
        }
        dispatch(addUser(newUser))
        navigator('/users')
    }

    return(
        <>
            <form onSubmit={handleCreate}>
                    <div>
                        <label htmlFor="firstName"></label>
                        <input type="text" name="first_name" />
                    </div>
                    <div>
                        <label htmlFor="lastName"></label>
                        <input type="text" name="last_name" />
                    </div>
                    <div>
                        <label htmlFor="job"></label>
                        <select name="job" id="job">
                            <option value="true">Room Service</option>
                            <option value="false">Manager</option>
                            <option value="false">Recepcionist</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email" name="email"/>
                    </div>
                    <div>
                        <label htmlFor="phone"></label>
                        <input type="tel" name="phone" />
                    </div>
                    
                    <div>
                        <label htmlFor="description"></label>
                        <textarea name="description" id="description" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <label htmlFor="status"></label>
                        <select name="status" id="status" >
                            <option value="Status">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={handleBack}>Cancel</button>
                    </div>
                </form>
        </>
    )
}
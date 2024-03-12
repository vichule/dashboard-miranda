import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUsersData, getUsersError, getUsersStatus } from "../features/users/usersSlice"
import { useState } from "react"


export const UserID = () => {
    const navigator = useNavigate()
    const { id } = useParams()
    const userData = useSelector(getUsersData)
    const userDataError = useSelector(getUsersError)
    const userDataStatus = useSelector(getUsersStatus)
    const dispatch = useDispatch()

    const [ user, setUser ] = useState({})



    const handleBack = () =>{
        navigator(-1)
    }
    const handleDeleteUser = (event) =>{
        event.preventDefault()
        console.log('delete')
    }
    const handleSaveUser = (event) =>{
        event.preventDefault()
        console.log('save')
    }

    return(
        <>

            <div>
                <button onClick={handleBack}>Back</button>
                <form onSubmit={handleSaveUser}>
                    <div>
                        <label htmlFor="firstName"></label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="lastName"></label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="job"></label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="firstName"></label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="email"></label>
                        <input type="email" />
                    </div>
                    <div>
                        <label htmlFor="phone"></label>
                        <input type="tel" />
                    </div>
                    <div>
                        <label htmlFor="start"></label>
                        <input type="date" />
                    </div>
                    <div>
                        <label htmlFor="task"></label>
                        <textarea name="task" id="task" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <label htmlFor="state"></label>
                        <select name="state" id="state">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={handleDeleteUser}>Delete User</button>
                    </div>
                </form>
            </div>
        
        </>
    )
}
import styled from "styled-components"
import data from '../data/users.json'
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { BookingsTable } from "../components/Tables/BookingsTable"
import { useEffect, useState } from "react"
import { UsersTable } from "../components/Tables/UsersTable"
import { useDispatch, useSelector } from "react-redux"
import { getUsersData, getUsersError, getUsersStatus } from "../features/users/usersSlice"
import { userListThunk } from "../features/users/usersThunk"



export const Users = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(getUsersData)
    const usersDataError = useSelector(getUsersError)
    const usersDataStatus = useSelector(getUsersStatus)

    const [ users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 5;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedUsers = users.slice(firstPage, LastPage)
    const totalPages = Math.ceil(users.length / rows);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };


    useEffect(() =>{
        let newUsers = []
        if(usersDataStatus === 'idle'){
            dispatch(userListThunk())
        }else if(usersDataStatus === 'pending'){

        }else if (usersDataStatus === 'fulfilled'){
            newUsers = [...usersData]
            setUsers(newUsers)

        }else if(usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }

    },[dispatch, usersData, usersDataStatus])

    return (
        <>
            <UsersContainer>
            <UsersMenu>
                <h2> All Employee </h2>
                <h2> Active Employee </h2>
                <h2> Inactive Employee </h2>
            </UsersMenu>
            <TableStyled>
                <thead>
                        <tr>
                            <TdStyled>Name</TdStyled>
                            <TdStyled>Job Desk</TdStyled>
                            <TdStyled>Contact</TdStyled>
                            <TdStyled>Status</TdStyled>
                            <TdStyled>Options</TdStyled>
                        </tr>
                </thead>
                <tbody>
                    <UsersTable data={displayedUsers}/>
                </tbody>
                
            </TableStyled>
            <div>
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
            </UsersContainer>
        </>
    )
}

const UsersContainer = styled.div`
    padding: 3em;
`

const UsersMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 25%;
    
    h2{
        cursor: pointer;
    }
`
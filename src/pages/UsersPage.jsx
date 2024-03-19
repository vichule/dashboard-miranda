import styled from "styled-components"
import data from '../data/users.json'
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { BookingsTable } from "../components/Tables/BookingsTable"
import { useEffect, useState } from "react"
import { UsersTable } from "../components/Tables/UsersTable"
import { useDispatch, useSelector } from "react-redux"
import { getUsersData, getUsersError, getUsersStatus } from "../features/users/usersSlice"
import { userListThunk } from "../features/users/usersThunk"
import { useNavigate } from "react-router-dom"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import { colors } from "../styles/colors"



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
    const navigator = useNavigate()

    const [filter, setFilter] = useState('none')

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    const handleNew = () => {
        navigator('/users/newuser')
    }


    useEffect(() =>{
        let newUsers = []
        if(usersDataStatus === 'idle'){
            dispatch(userListThunk())
        }else if(usersDataStatus === 'pending'){

        }else if (usersDataStatus === 'fulfilled'){
            if (filter === 'Active'){
                newUsers = usersData.filter((user) => user.status === "Active" )
            }else if(filter === 'Inactive'){
                newUsers = usersData.filter((user) => user.status === "Inactive" )
            }else{
                newUsers = [...usersData]
                
            }
            
            setUsers(newUsers)

        }else if(usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }

    },[dispatch, usersData, usersDataStatus, filter])

    const handleFilter = (option) => {
        setFilter(option);
      };

    return (
        <>
            <UsersContainer>
            <UsersMenu>
                <TabMenu>
                    <TabElement onClick={()=> handleFilter("none")}> All Employee </TabElement>
                    <TabElement onClick={()=> handleFilter("Active")}> Active Employee </TabElement>
                    <TabElement onClick={()=> handleFilter("Inactive")}> Inactive Employee </TabElement>
                </TabMenu>
                <GreenBtnStyled onClick={handleNew}>+ New User</GreenBtnStyled>
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
            <PaginationContainer>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
            </PaginationContainer>
            </UsersContainer>
        </>
    )
}

const UsersContainer = styled.div`
    padding: 3em;
`

const UsersMenu = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
    width: 95%;
   
`

const TabMenu = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 70%;
    align-items: flex-end;
`
const TabElement = styled.li`
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colors.grey2};
    border-bottom: 1px solid ${colors.grey2};
    width: 11em;
        &:hover{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        }
        &:active{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        }
    `
const PaginationContainer = styled.div`
display: flex;
gap: 5em;
`
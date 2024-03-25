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
import { GreenBtnStyled, OrderSelect } from "../components/Button/BtnStyled"
import { colors } from "../styles/colors"
import { TabElement } from "../components/Tabs/TabsStyled"



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
    const [currentTab, setCurrenTab] = useState('none')
    const [order, setOrder] = useState('none')

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

            const orderedUsers = newUsers.sort((a, b) => {
                switch (order) {
                    
                        
                    case 'oldest':
                        return new Date(a.start_date) - new Date(b.start_date)
                    case 'asc':
                        if (a.first_name <  b.first_name) {
                            return -1;
                        }
                        if (a.first_name >  b.first_name) {
                            return 1;
                        }
                        return 0;
                    case 'desc':
                            if (a.first_name > b.first_name) {
                                return -1;
                            }
                            if (a.first_name < b.first_name) {
                                return 1;
                            }
                            return 0;
                    
                    default:
                        return new Date(b.start_date) - new Date(a.start_date);
                }
            })
            
            setUsers(orderedUsers)

        }else if(usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }

    },[dispatch, usersData, usersDataStatus, filter,order])

    const handleFilter = (option) => {
        setFilter(option);
        setCurrenTab(option)
      };

      const handleOrder = (e) => {
        e.preventDefault();

        setOrder(e.target.value)

    }

    return (
        <>
            <UsersContainer>
            <UsersMenu>
                <TabMenu>
                    <TabElement onClick={()=> handleFilter("none")} $isActive={currentTab === "none" ? true : false}> All Employee </TabElement>
                    <TabElement onClick={()=> handleFilter("Active")} $isActive={currentTab === "Active" ? true : false}> Active Employee </TabElement>
                    <TabElement onClick={()=> handleFilter("Inactive")} $isActive={currentTab === "Inactive" ? true : false}> Inactive Employee </TabElement>
                </TabMenu>
                <GreenBtnStyled onClick={handleNew}>+ New User</GreenBtnStyled>
                <OrderSelect name="order" id="order" onChange={(e) => handleOrder(e)}>
                            <option value="none">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="asc">ABC</option>
                            <option value="desc">CBA</option>
                            
                </OrderSelect>
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

const PaginationContainer = styled.div`
display: flex;
gap: 5em;
`
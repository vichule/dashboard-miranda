import styled from "styled-components"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { useEffect, useState } from "react"
import { UsersTable } from "../components/Tables/UsersTable"
import { getUsersData, getUsersError, getUsersStatus } from "../features/users/usersSlice"
import { userListThunk } from "../features/users/usersThunk"
import { useNavigate } from "react-router-dom"
import { GreenBtnStyled, OrderSelect } from "../components/Button/BtnStyled"
import { colors } from "../styles/colors"
import { TabElement } from "../components/Tabs/TabsStyled"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { UserInterface } from "../features/interfaces/interfaces"



export const Users = () => {
    const dispatch = useAppDispatch()
    const usersData = useAppSelector(getUsersData)
    const usersDataError = useAppSelector(getUsersError)
    const usersDataStatus = useAppSelector(getUsersStatus)

    const [users, setUsers] = useState<UserInterface[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const rows = 5;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedUsers = users.slice(firstPage, LastPage)
    const totalPages = Math.ceil(users.length / rows);
    const navigator = useNavigate()

    const [filter, setFilter] = useState<string>('none')
    const [currentTab, setCurrenTab] = useState<string>('none')
    const [order, setOrder] = useState<string>('none')
    const [search, setSearch] = useState<string>("")

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleNew = () => {
        navigator('/users/newuser')
    }


    useEffect(() => {
        let newUsers = []
        if (usersDataStatus === 'idle') {
            dispatch(userListThunk())
        } else if (usersDataStatus === 'pending') {

        } else if (usersDataStatus === 'fulfilled') {
            if (filter === 'Active') {
                newUsers = usersData.filter((user) => user.status === "Active")
            } else if (filter === 'Inactive') {
                newUsers = usersData.filter((user) => user.status === "Inactive")
            } else {
                newUsers = [...usersData]

            }

            let orderedUsers = newUsers.sort((a, b) => {
                switch (order) {


                    case 'oldest':
                        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                    case 'asc':
                        if (a.first_name < b.first_name) {
                            return -1;
                        }
                        if (a.first_name > b.first_name) {
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
                        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
                }
            })

            if (search) {
                const fixedSearch = search.toLowerCase();
                orderedUsers = orderedUsers.filter((user) => user.first_name.toLowerCase().includes(fixedSearch));
            }

            setUsers(orderedUsers)

        } else if (usersDataStatus === 'rejected') {
            console.log(usersDataError)
        }

    }, [dispatch, usersData, usersDataStatus, filter, order, search])

    const handleFilter = (option: string) => {
        setFilter(option);
        setCurrenTab(option)
    };

    const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setOrder(e.target.value)

    }

    return (
        <>
            <UsersContainer>
                <UsersMenu>
                    <TabMenu>
                        <TabElement onClick={() => handleFilter("none")} $isActive={currentTab === "none"}> All Employee </TabElement>
                        <TabElement onClick={() => handleFilter("Active")} $isActive={currentTab === "Active"}> Active Employee </TabElement>
                        <TabElement onClick={() => handleFilter("Inactive")} $isActive={currentTab === "Inactive"}> Inactive Employee </TabElement>
                        <SearchInput type="text" name="searchBar" id="searchBar" placeholder="Search Name" onChange={(e) => setSearch(e.target.value)} />
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
                        <UsersTable data={displayedUsers} />
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

const SearchInput = styled.input`
    border-radius: 1em;
    padding: 1em;
    background-color: #d6fdd69c;
    border: 1px solid ${colors.hardGreen};
    color: ${colors.hardGreen};
    font-size: 1.3rem;
    margin-left: 5em;
    width: 40rem;
`
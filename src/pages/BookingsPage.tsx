import styled from "styled-components"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { BookingsTable } from "../components/Tables/BookingsTable"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getBookingsData, getBookingsError, getBookingsStatus } from "../features/bookings/bookingsSlice"
import { bookingsListThunk } from "../features/bookings/bookingsThunk"
import { GreenBtnStyled, OrderSelect } from "../components/Button/BtnStyled"
import { colors } from "../styles/colors"
import { TabElement, TabMenu } from "../components/Tabs/TabsStyled"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BookingInterface } from "../features/interfaces/interfaces"



export const Bookings = () => {
    const bookingsData = useAppSelector(getBookingsData)
    const bookingsDataError = useAppSelector(getBookingsError)
    const bookingsDataStatus = useAppSelector(getBookingsStatus)
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const [ bookings, setBookings] = useState<BookingInterface[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const rows = 10;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedBookings = bookings.slice(firstPage, LastPage)
    const totalPages = Math.ceil(bookings.length / rows);

    const [filter, setFilter] = useState<string>('none')
    const [order, setOrder] = useState<string>('none');
    const [currentTab, setCurrenTab] = useState<string>('none')
    const [search, setSearch] = useState<string>("")

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };

    useEffect(() =>{
        let newBookings = []
        if(bookingsDataStatus === 'idle'){
            dispatch(bookingsListThunk())
        }
        if (bookingsDataStatus === 'pending'){
            
        }else if(bookingsDataStatus === 'fulfilled'){
            if (filter === 'Check-in'){
                newBookings = bookingsData.filter((booking) => booking.status === "Check-in" )
            }else if(filter === 'Check-out'){
                newBookings = bookingsData.filter((booking) => booking.status === "Check-out" )
            }else if(filter === 'In progress'){
                newBookings = bookingsData.filter((booking) => booking.status === "In progress" )
            }else{
                newBookings = [...bookingsData]
                
            }

            let orderedBookings = newBookings.sort((a, b) => {
                switch (order) {
                    case 'guest':
                        const nameA = a.first_name
                        const nameB = b.first_name
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                        
                    case 'check_in':
                        return new Date(a.check_in).getTime() - new Date(b.check_in).getTime()
                    case 'check_out':
                        return new Date(a.check_out).getTime() - new Date(b.check_out).getTime()
                    
                    default:
                        return new Date(a.order_date).getTime() - new Date(b.order_date).getTime()
                }
            })
            
            if (search) {
                const fixedSearch = search.toLowerCase();
                orderedBookings = orderedBookings.filter((bookings) => bookings.first_name.toLowerCase().includes(fixedSearch));
              }
           
            setBookings(orderedBookings)

        }else if(bookingsDataStatus === 'rejected'){
            console.log(bookingsDataError)
        }
    },[dispatch, bookingsData, bookingsDataStatus, filter,order, search])

    const handleFilter = (option: string) => {
        setFilter(option);
        setCurrenTab(option)
      };

      const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setOrder(e.target.value)

    }

    const handleNew = () => {
        navigator('/bookings/newbooking')
    }

    return (
        <>
            <BookingsContainer>
            <BookingsMenu>
                <TabMenu>
                    <TabElement onClick={()=> handleFilter("none")} $isActive={currentTab === "none" ? true : false}> All Bookings </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-in")} $isActive={currentTab === "Check-in" ? true : false}> Checking In </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-out")} $isActive={currentTab === "Check-out" ? true : false}> Checking Out </TabElement>
                    <TabElement onClick={()=> handleFilter("In progress")} $isActive={currentTab === "In progress" ? true : false}> In Progress </TabElement>
                    <SearchInput type="text" name="searchBar" id="searchBar" placeholder="Search Name" onChange={(e)=> setSearch(e.target.value)}/>
                </TabMenu>
                <GreenBtnStyled onClick={handleNew}>+ New Booking</GreenBtnStyled>
                <OrderSelect name="order" id="order" onChange={(e) => handleOrder(e)}>
                            <option value="date">Order Date</option>
                            <option value="guest">Guest</option>
                            <option value="check_in">Check In</option>
                            <option value="check_out">Check Out</option>
                            
                </OrderSelect>
            </BookingsMenu>
            <TableStyled>
                <thead>
                        <tr>
                            <TdStyled>Guest</TdStyled>
                            <TdStyled>Order Date</TdStyled>
                            <TdStyled>Check In</TdStyled>
                            <TdStyled>Check Out</TdStyled>
                            <TdStyled>Special Request</TdStyled>
                            <TdStyled>Room Type</TdStyled>
                            <TdStyled>Status</TdStyled>
                        </tr>
                </thead>
                <tbody>
                    <BookingsTable data={displayedBookings}/>
                </tbody>
                
            </TableStyled>
            <PaginationContainer>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
            </PaginationContainer>
            </BookingsContainer>
        </>
    )
}

const BookingsContainer = styled.div`
    padding: 3em;
`

const BookingsMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    margin-bottom: 2em;
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
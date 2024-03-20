import styled from "styled-components"
import data from '../data/bookings.json'
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { BookingsTable } from "../components/Tables/BookingsTable"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookingsData, getBookingsError, getBookingsStatus } from "../features/bookings/bookingsSlice"
import { bookingsListThunk } from "../features/bookings/bookingsThunk"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import { colors } from "../styles/colors"
import { TabElement, TabMenu } from "../components/Tabs/TabsStyled"



export const Bookings = () => {
    const bookingsData = useSelector(getBookingsData)
    const bookingsDataError = useSelector(getBookingsError)
    const bookingsDataStatus = useSelector(getBookingsStatus)
    const dispatch = useDispatch()
    const [ bookings, setBookings] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 10;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedBookings = bookings.slice(firstPage, LastPage)
    const totalPages = Math.ceil(bookings.length / rows);

    const [filter, setFilter] = useState('none')
    const [order, setOrder] = useState('none');
    const [currentTab, setCurrenTab] = useState('none')

    const handlePageChange = (newPage) => {
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

            const orderedBookings = newBookings.sort((a, b) => {
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
                        return new Date(a.check_in) - new Date(b.check_in)
                    case 'check_out':
                        return new Date(a.check_out) - new Date(b.check_out)
                    
                    default:
                        return new Date(a.order_date) - new Date(b.order_date);
                }
            })
            
           
            setBookings(orderedBookings)

        }else if(bookingsDataStatus === 'rejected'){
            console.log(bookingsDataError)
        }
    },[dispatch, bookingsData, bookingsDataStatus, filter,order])

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
            <BookingsContainer>
            <BookingsMenu>
                <TabMenu>
                    <TabElement onClick={()=> handleFilter("none")} $isActive={currentTab === "none" ? true : false}> All Bookings </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-in")} $isActive={currentTab === "Check-in" ? true : false}> Checking In </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-out")} $isActive={currentTab === "Check-out" ? true : false}> Checking Out </TabElement>
                    <TabElement onClick={()=> handleFilter("In progress")} $isActive={currentTab === "In progress" ? true : false}> In Progress </TabElement>
                </TabMenu>

                <select name="order" id="order" onChange={(e) => handleOrder(e)}>
                            <option value="date">Order Date</option>
                            <option value="guest">Guest</option>
                            <option value="check_in">Check In</option>
                            <option value="check_out">Check Out</option>
                            
                </select>
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
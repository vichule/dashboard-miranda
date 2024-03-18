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
            
           
            setBookings(newBookings)

        }else if(bookingsDataStatus === 'rejected'){
            console.log(bookingsDataError)
        }
    },[dispatch, bookingsData, bookingsDataStatus, filter])

    const handleFilter = (option) => {
        setFilter(option);
      };

    return (
        <>
            <BookingsContainer>
            <BookingsMenu>
                <TabMenu>
                    <TabElement onClick={()=> handleFilter("none")}> All Bookings </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-in")}> Checking In </TabElement>
                    <TabElement onClick={()=> handleFilter("Check-out")}> Checking Out </TabElement>
                    <TabElement onClick={()=> handleFilter("In progress")}> In Progress </TabElement>
                </TabMenu>

                <select name="order" id="order">
                            <option value="true">Guest</option>
                            <option value="false">Check In</option>
                            <option value="false">Check Out</option>
                            <option value="false">Order Date</option>
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
            <div>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
            </div>
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

const TabMenu = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 100%;
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